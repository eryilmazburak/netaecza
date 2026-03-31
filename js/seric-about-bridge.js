(() => {
  const section = document.querySelector(".neta-seric-about");
  if (!section) {
    return;
  }

  const reveals = Array.from(section.querySelectorAll(".seric-reveal"));
  const rollers = Array.from(section.querySelectorAll("[data-seric-roll='true']"));
  let replayFrame = null;
  let isActive = false;

  const clearReplayFrame = () => {
    if (replayFrame === null) {
      return;
    }
    window.cancelAnimationFrame(replayFrame);
    replayFrame = null;
  };

  const setDelay = (element) => {
    const delay = Number(element.getAttribute("data-seric-delay") || 0);
    element.style.setProperty("--seric-delay", `${delay}ms`);
  };

  const resetReveals = () => {
    reveals.forEach((element) => {
      setDelay(element);
      element.classList.remove("is-visible");
      element.style.opacity = "0";
    });
  };

  const resetRollers = () => {
    rollers.forEach((roller) => {
      roller.classList.remove("is-started");
      const primary = roller.querySelector(".number._01");
      const secondary = roller.querySelector(".number._02");
      if (primary) {
        primary.style.transform = "";
      }
      if (secondary) {
        secondary.style.transform = "";
      }
    });
  };

  const applyReset = () => {
    resetReveals();
    resetRollers();
  };

  const resetSection = () => {
    if (!isActive && replayFrame === null) {
      return;
    }
    isActive = false;
    clearReplayFrame();
    applyReset();
  };

  const playSection = () => {
    if (isActive || replayFrame !== null) {
      return;
    }
    applyReset();

    replayFrame = window.requestAnimationFrame(() => {
      replayFrame = null;
      isActive = true;

      reveals.forEach((element) => {
        setDelay(element);
        element.classList.add("is-visible");
        element.style.opacity = "1";
      });

      rollers.forEach((roller) => {
        roller.classList.add("is-started");
      });
    });
  };

  applyReset();

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      end: "bottom 12%",
      onEnter: playSection,
      onEnterBack: playSection,
      onLeave: resetSection,
      onLeaveBack: resetSection,
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    playSection();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playSection();
          return;
        }
        resetSection();
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -12% 0px",
    }
  );

  observer.observe(section);
})();
