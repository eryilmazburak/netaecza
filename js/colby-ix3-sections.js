(function () {
  var SOURCE_PATH = "js/colby-webflow-script-2.js";
  var REFERENCE_PAGE_ID = "697c4eac729390442e8eff99";

  function scanBalancedArray(source, startIndex) {
    var depth = 0;
    var inString = null;
    var escaped = false;

    for (var index = startIndex; index < source.length; index += 1) {
      var char = source.charAt(index);

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === "\\") {
          escaped = true;
        } else if (char === inString) {
          inString = null;
        }

        continue;
      }

      if (char === "\"" || char === "'") {
        inString = char;
        continue;
      }

      if (char === "[") {
        depth += 1;
        continue;
      }

      if (char === "]") {
        depth -= 1;

        if (depth === 0) {
          return index;
        }
      }
    }

    return -1;
  }

  function extractRegisterPayload(source) {
    var needle = "a.register([";
    var registerIndex = source.indexOf(needle);

    if (registerIndex === -1) {
      return null;
    }

    var firstStart = source.indexOf("[", registerIndex);
    var firstEnd = scanBalancedArray(source, firstStart);

    if (firstStart === -1 || firstEnd === -1) {
      return null;
    }

    var secondStart = source.indexOf("[", firstEnd + 1);
    var secondEnd = scanBalancedArray(source, secondStart);

    if (secondStart === -1 || secondEnd === -1) {
      return null;
    }

    return {
      interactions: source.slice(firstStart, firstEnd + 1),
      timelines: source.slice(secondStart, secondEnd + 1)
    };
  }

  function parseLiteral(source) {
    return Function("\"use strict\"; return (" + source + ");")();
  }

  function finish(state) {
    document.documentElement.classList.add("neta-colby-ix3-ready");

    if (state) {
      state.done = true;
      state.loading = false;
    }
  }

  function initColbyIx3() {
    var html = document.documentElement;
    var pageId = html.getAttribute("data-wf-page");
    var state = window.__netaColbyIx3State || (window.__netaColbyIx3State = {});

    if (!pageId || state.done || state.loading) {
      return;
    }

    if (!window.Webflow || typeof window.Webflow.require !== "function") {
      finish(state);
      return;
    }

    var ix3;

    try {
      ix3 = window.Webflow.require("ix3");
    } catch (error) {
      console.error("Neta Colby ix3 bridge: ix3 runtime unavailable.", error);
      finish(state);
      return;
    }

    if (!ix3 || typeof ix3.ready !== "function") {
      finish(state);
      return;
    }

    state.loading = true;

    Promise.resolve(ix3.ready())
      .then(function () {
        var instance = typeof ix3.getInstance === "function" ? ix3.getInstance() : null;

        if (!instance || typeof instance.register !== "function") {
          throw new Error("ix3 instance unavailable");
        }

        return fetch(SOURCE_PATH, { credentials: "same-origin" })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Unable to load Colby ix3 source: " + response.status);
            }

            return response.text();
          })
          .then(function (source) {
            var patchedSource = source.split(REFERENCE_PAGE_ID).join(pageId);
            var payload = extractRegisterPayload(patchedSource);

            if (!payload) {
              throw new Error("Unable to extract Colby ix3 payload");
            }

            instance.register(
              parseLiteral(payload.interactions),
              parseLiteral(payload.timelines)
            );

            window.dispatchEvent(new CustomEvent("__wf_ix3_ready"));
            finish(state);
          });
      })
      .catch(function (error) {
        console.error("Neta Colby ix3 bridge failed.", error);
        finish(state);
      });
  }

  if (document.readyState === "complete") {
    initColbyIx3();
  } else {
    window.addEventListener("load", initColbyIx3, { once: true });
  }
})();
