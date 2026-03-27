(() => {
  const interactions = [{"id":"i-7339dba6","scope":{"type":"site"},"triggers":[["wf:scroll",{"controlType":"scroll","scrollTriggerConfig":{"clamp":true,"start":"top+=70% center","end":"bottom bottom","scrub":0.95,"enter":"play","leave":"none","enterBack":"none","leaveBack":"none"}},["wf:class",["tracks.home-2.service"],{"relationship":"none","firstMatchOnly":false}]]],"timelineIds":["t-9a817bd9"],"deleted":false},{"id":"i-5a5ccbe0","scope":{"type":"site"},"triggers":[["wf:scroll",{"controlType":"scroll","scrollTriggerConfig":{"clamp":true,"start":"top+=50% 50%","end":"bottom 120%","scrub":0.8,"enter":"play","leave":"none","enterBack":"none","leaveBack":"none"}},["wf:class",["tracks.home-2.cta"],{"relationship":"none","firstMatchOnly":false}]]],"timelineIds":["t-e2e99f8c"],"conditionalPlayback":[{"type":"breakpoint","behavior":"dont-animate","breakpoints":["tiny"]}],"deleted":false},{"id":"i-5b72d293","scope":{"type":"site"},"triggers":[["wf:scroll",{"controlType":"scroll","scrollTriggerConfig":{"clamp":true,"start":"top+=20% 10%","end":"bottom 110%","scrub":0.8,"enter":"play","leave":"none","enterBack":"none","leaveBack":"none"}},["wf:class",["tracks.home-2.cta"],{"relationship":"none","firstMatchOnly":false}]]],"timelineIds":["t-819732cc"],"conditionalPlayback":[{"type":"breakpoint","behavior":"dont-animate","breakpoints":["main","medium","small"]}],"deleted":false},{"id":"i-52cafb9c","scope":{"type":"site"},"triggers":[["wf:scroll",{"controlType":"scroll","scrollTriggerConfig":{"clamp":true,"start":"top bottom","end":"bottom top","scrub":null,"enter":"play","leave":"none","enterBack":"play","leaveBack":"reverse"}},["wf:class",["trigger-preload-cta"],{"relationship":"none","firstMatchOnly":false}]]],"timelineIds":["t-3c777a8e"],"deleted":false}];
  const timelines = [{"id":"t-9a817bd9","deleted":false,"actions":[{"id":"ta-a406fea2","targets":[["wf:class",["wrapper-block-project.home-2"],{"relationship":"none","firstMatchOnly":false}],["wf:class",["block-list-project.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.6,"position":0,"ease":0},"tt":2,"properties":{"wf:transform":{"height":["100%","0%"]}}},{"id":"ta-d482c745","targets":[["wf:class",["block-list-project.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.1,"position":0.6,"ease":0},"properties":{"wf:transform":{"opacity":[null,"0%"]},"wf:style":{}}}]},{"id":"t-a4809009","deleted":false,"actions":[{"id":"ta-390d964c","targets":[["wf:class",["bg-service"],{"relationship":"within","filterBy":["wf:trigger-only",""],"firstMatchOnly":false}]],"timing":{"position":0,"ease":11},"tt":2,"properties":{"wf:transform":{"y":["110%","0%"]}}},{"id":"ta-f2592e8c","targets":[["wf:class",["small-text.animation-service.home-2"],{"relationship":"within","filterBy":["wf:trigger-only",""],"firstMatchOnly":false}],["wf:class",["big-text.animation-service.home-2"],{"relationship":"within","filterBy":["wf:trigger-only",""],"firstMatchOnly":false}]],"timing":{"position":0,"ease":2},"properties":{"wf:transform":{},"wf:style":{"color":[null,"hsla(0, 0.00%, 100.00%, 1.00)"]}}}]},{"id":"t-e2e99f8c","deleted":false,"actions":[{"id":"ta-2686853d","targets":[["wf:class",["wrapper-rotate-cta.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"position":0,"ease":0},"tt":2,"properties":{"wf:transform":{"width":["0vw","72vw"]}}},{"id":"ta-09f57429","targets":[["wf:class",["big-text.cta.text-center.v1"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.15,"position":0,"ease":0},"properties":{"wf:transform":{"y":[null,"100%"]}}},{"id":"ta-b41c2eed","targets":[["wf:class",["wrapper-block-cta.home-2"],{"relationship":"within","filterBy":["wf:trigger-only",""],"firstMatchOnly":false}]],"timing":{"position":0,"ease":0},"tt":2,"properties":{"wf:transform":{"rotation":["0deg","180deg"]}}},{"id":"ta-9a5fd207","targets":[["wf:class",["block-rotate-cta.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"position":0,"ease":0},"properties":{"wf:transform":{"rotation":[null,"-180deg"]}}},{"id":"ta-995bf7bd","targets":[["wf:class",["wrapper-title-cta.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.05,"position":0.3,"ease":2},"tt":2,"properties":{"wf:transform":{"y":["100%","0%"]}}}]},{"id":"t-819732cc","deleted":false,"actions":[{"id":"ta-e432b7ef","targets":[["wf:class",["wrapper-rotate-cta.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"position":0,"ease":0},"tt":2,"properties":{"wf:transform":{"width":["0vw","100vw"]}}},{"id":"ta-7494f58c","targets":[["wf:class",["wrapper-block-cta.home-2"],{"relationship":"within","filterBy":["wf:trigger-only",""],"firstMatchOnly":false}]],"timing":{"position":0,"ease":0},"tt":2,"properties":{"wf:transform":{"rotation":["0deg","180deg"]}}},{"id":"ta-a01345fd","targets":[["wf:class",["block-rotate-cta.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"position":0,"ease":0},"properties":{"wf:transform":{"rotation":[null,"-180deg"]}}},{"id":"ta-7d47355b","targets":[["wf:class",["big-text.cta.text-center.v1"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.15,"position":0,"ease":0},"properties":{"wf:transform":{"y":[null,"100%"]}}},{"id":"ta-e2aae283","targets":[["wf:class",["wrapper-title-cta.home-2"],{"relationship":"within","filterBy":["wf:trigger-only",""],"firstMatchOnly":false}]],"timing":{"duration":0.35,"position":0.15,"ease":0},"tt":2,"properties":{"wf:transform":{"y":["100%","0%"]}}}]},{"id":"t-3c777a8e","deleted":false,"actions":[{"id":"ta-3fb89cbc","targets":[["wf:class",["block-rotate-cta.home-2.v1"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[1,1]}}},{"id":"ta-f5c838ba","targets":[["wf:class",["block-rotate-cta.home-2.v2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[0.9,1]}}},{"id":"ta-eab1be86","targets":[["wf:class",["block-rotate-cta.home-2.v3"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[0.8,1]}}},{"id":"ta-1f9fa91a","targets":[["wf:class",["block-rotate-cta.home-2.v4"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[0.7,1]}}},{"id":"ta-7ace2b0f","targets":[["wf:class",["block-rotate-cta.home-2.v5"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[0.6,1]}}},{"id":"ta-5465a6aa","targets":[["wf:class",["block-rotate-cta.home-2.v6"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[0.5,1]}}},{"id":"ta-d205fcf6","targets":[["wf:class",["block-rotate-cta.home-2.v7"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[0.4,1]}}},{"id":"ta-36b93250","targets":[["wf:class",["block-rotate-cta.home-2.v8"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":0.7,"position":0,"ease":2},"tt":2,"properties":{"wf:transform":{"scale":[0.3,1]}}},{"id":"ta-125cc5f9","targets":[["wf:class",["wrapper-block-cta.home-2"],{"relationship":"none","firstMatchOnly":false}]],"timing":{"duration":1,"position":0,"ease":3},"tt":2,"properties":{"wf:transform":{"scale":[0.5,1]}}}]}];

  function markReady() {
    document.querySelectorAll(".neta-colby-scope").forEach((element) => element.classList.add("neta-colby-ready"));
  }

  function init() {
    if (window.__netaColbyExactReady) {
      markReady();
      return;
    }

    const ix3Module = window.Webflow && window.Webflow.require && window.Webflow.require("ix3");
    if (!ix3Module || typeof ix3Module.ready !== "function") {
      return;
    }

    ix3Module.ready().then(() => {
      const instance = ix3Module.getInstance();
      if (!instance || typeof instance.register !== "function") {
        return;
      }

      if (!instance.interactions.has("i-7339dba6")) {
        instance.register(interactions, timelines);
      }

      window.__netaColbyExactReady = true;
      requestAnimationFrame(() => requestAnimationFrame(markReady));
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        init();
      }
    });
  }
})();
