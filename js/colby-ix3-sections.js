(function () {
  var SOURCE_PATH = "REFERANS/kitpro-colby/js/webflow-script-2.js";
  var REFERENCE_PAGE_ID = "697c4eac729390442e8eff99";
  var IX2_PREFIX = "neta-colby-ix2-";
  var IX3_PREFIX = "neta-colby-ix3-";
  var IX2_EVENT_IDS = ["e-186", "e-576", "e-578", "e-580", "e-582", "e-584"];
  var IX2_ACTION_LIST_IDS = ["a-101", "a-210"];

  function scanBalanced(source, startIndex, openChar, closeChar) {
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

      if (char === openChar) {
        depth += 1;
        continue;
      }

      if (char === closeChar) {
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
    var firstEnd = scanBalanced(source, firstStart, "[", "]");

    if (firstStart === -1 || firstEnd === -1) {
      return null;
    }

    var secondStart = source.indexOf("[", firstEnd + 1);
    var secondEnd = scanBalanced(source, secondStart, "[", "]");

    if (secondStart === -1 || secondEnd === -1) {
      return null;
    }

    return {
      interactions: source.slice(firstStart, firstEnd + 1),
      timelines: source.slice(secondStart, secondEnd + 1)
    };
  }

  function extractIx2Payload(source) {
    var needle = "Webflow.require(\"ix2\").init(";
    var initIndex = source.indexOf(needle);

    if (initIndex === -1) {
      needle = "Webflow.require('ix2').init(";
      initIndex = source.indexOf(needle);
    }

    if (initIndex === -1) {
      return null;
    }

    var objectStart = source.indexOf("{", initIndex);
    var objectEnd = scanBalanced(source, objectStart, "{", "}");

    if (objectStart === -1 || objectEnd === -1) {
      return null;
    }

    return source.slice(objectStart, objectEnd + 1);
  }

  function parseLiteral(source) {
    return Function("\"use strict\"; return (" + source + ");")();
  }

  function replaceReferencePageId(value, pageId) {
    return typeof value === "string"
      ? value.split(REFERENCE_PAGE_ID).join(pageId)
      : value;
  }

  function transformValue(value, maps, pageId) {
    if (Array.isArray(value)) {
      return value.map(function (item) {
        return transformValue(item, maps, pageId);
      });
    }

    if (value && typeof value === "object") {
      var result = {};
      Object.keys(value).forEach(function (key) {
        result[key] = transformValue(value[key], maps, pageId);
      });
      return result;
    }

    if (typeof value !== "string") {
      return value;
    }

    if (maps && maps.eventIds && maps.eventIds[value]) {
      return maps.eventIds[value];
    }

    if (maps && maps.actionListIds && maps.actionListIds[value]) {
      return maps.actionListIds[value];
    }

    if (maps && maps.interactionIds && maps.interactionIds[value]) {
      return maps.interactionIds[value];
    }

    if (maps && maps.timelineIds && maps.timelineIds[value]) {
      return maps.timelineIds[value];
    }

    return replaceReferencePageId(value, pageId);
  }

  function namespaceIx2Payload(rawData, pageId) {
    var eventIds = {};
    var actionListIds = {};

    Object.keys(rawData.events || {}).forEach(function (id) {
      eventIds[id] = IX2_PREFIX + id;
    });

    Object.keys(rawData.actionLists || {}).forEach(function (id) {
      actionListIds[id] = IX2_PREFIX + id;
    });

    return transformValue(rawData, {
      eventIds: eventIds,
      actionListIds: actionListIds
    }, pageId);
  }

  function namespaceIx3Payload(payload, pageId) {
    var interactionIds = {};
    var timelineIds = {};

    (payload.interactions || []).forEach(function (interaction) {
      if (interaction && interaction.id) {
        interactionIds[interaction.id] = IX3_PREFIX + interaction.id;
      }
    });

    (payload.timelines || []).forEach(function (timeline) {
      if (timeline && timeline.id) {
        timelineIds[timeline.id] = IX3_PREFIX + timeline.id;
      }
    });

    return {
      interactions: transformValue(payload.interactions, {
        interactionIds: interactionIds,
        timelineIds: timelineIds
      }, pageId),
      timelines: transformValue(payload.timelines, {
        interactionIds: interactionIds,
        timelineIds: timelineIds
      }, pageId)
    };
  }

  function pickRelevantIx2Payload(rawData) {
    var filtered = {
      events: {},
      actionLists: {},
      site: rawData.site || {}
    };

    IX2_EVENT_IDS.forEach(function (id) {
      if (rawData.events && rawData.events[id]) {
        filtered.events[id] = rawData.events[id];
      }
    });

    IX2_ACTION_LIST_IDS.forEach(function (id) {
      if (rawData.actionLists && rawData.actionLists[id]) {
        filtered.actionLists[id] = rawData.actionLists[id];
      }
    });

    return filtered;
  }

  function mergeIx2Data(ix2, importedData) {
    if (!ix2 || typeof ix2.init !== "function" || !ix2.store || typeof ix2.store.getState !== "function") {
      return false;
    }

    var state = ix2.store.getState();
    var baseData = state && state.ixData ? state.ixData : null;

    if (!baseData) {
      return false;
    }

    var mergedData = {};

    Object.keys(baseData).forEach(function (key) {
      mergedData[key] = baseData[key];
    });

    mergedData.events = {};
    Object.keys(baseData.events || {}).forEach(function (key) {
      mergedData.events[key] = baseData.events[key];
    });
    Object.keys(importedData.events || {}).forEach(function (key) {
      mergedData.events[key] = importedData.events[key];
    });

    mergedData.actionLists = {};
    Object.keys(baseData.actionLists || {}).forEach(function (key) {
      mergedData.actionLists[key] = baseData.actionLists[key];
    });
    Object.keys(importedData.actionLists || {}).forEach(function (key) {
      mergedData.actionLists[key] = importedData.actionLists[key];
    });

    mergedData.site = {};
    Object.keys(baseData.site || {}).forEach(function (key) {
      mergedData.site[key] = baseData.site[key];
    });
    Object.keys(importedData.site || {}).forEach(function (key) {
      mergedData.site[key] = importedData.site[key];
    });

    ix2.init(mergedData);
    return true;
  }

  function finish(state) {
    document.documentElement.classList.add("neta-colby-ix3-ready");

    if (state) {
      state.done = true;
      state.loading = false;
    }
  }

  function initColbySections() {
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

    var ix2;
    var ix3;

    try {
      ix2 = window.Webflow.require("ix2");
      ix3 = window.Webflow.require("ix3");
    } catch (error) {
      console.error("Neta Colby bridge: runtime unavailable.", error);
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
              throw new Error("Unable to load Colby source: " + response.status);
            }

            return response.text();
          })
          .then(function (source) {
            var ix2Literal = extractIx2Payload(source);
            var ix3Literal = extractRegisterPayload(source);

            if (!ix2Literal || !ix3Literal) {
              throw new Error("Unable to extract Colby interaction payloads");
            }

            var ix2Payload = namespaceIx2Payload(
              pickRelevantIx2Payload(parseLiteral(ix2Literal)),
              pageId
            );
            var ix3Payload = namespaceIx3Payload({
              interactions: parseLiteral(ix3Literal.interactions),
              timelines: parseLiteral(ix3Literal.timelines)
            }, pageId);

            mergeIx2Data(ix2, ix2Payload);
            instance.register(ix3Payload.interactions, ix3Payload.timelines);

            window.dispatchEvent(new CustomEvent("__wf_ix3_ready"));
            finish(state);
          });
      })
      .catch(function (error) {
        console.error("Neta Colby bridge failed.", error);
        finish(state);
      });
  }

  if (document.readyState === "complete") {
    initColbySections();
  } else {
    window.addEventListener("load", initColbySections, { once: true });
  }
})();
