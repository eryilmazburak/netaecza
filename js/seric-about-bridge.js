(() => {
  const section = document.querySelector(".neta-seric-about");
  if (!section) {
    return;
  }

  const reveals = Array.from(section.querySelectorAll(".seric-reveal"));
  const rollers = Array.from(section.querySelectorAll("[data-seric-roll='true']"));
  const icon = section.querySelector(".about-icon");
  let replayTimeout = null;
  let isActive = false;

  const clearReplayTimeout = () => {
    if (!replayTimeout) {
      return;
    }
    window.clearTimeout(replayTimeout);
    replayTimeout = null;
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
    if (icon) {
      icon.classList.remove("is-spinning");
    }
  };

  const resetSection = () => {
    if (!isActive && !replayTimeout) {
      return;
    }
    isActive = false;
    clearReplayTimeout();
    applyReset();
  };

  const playSection = () => {
    if (isActive || replayTimeout) {
      return;
    }
    applyReset();

    replayTimeout = window.setTimeout(() => {
      replayTimeout = null;
      isActive = true;
      if (icon) {
        icon.classList.add("is-spinning");
      }

      reveals.forEach((element) => {
        setDelay(element);
        element.classList.add("is-visible");
        element.style.opacity = "1";
      });

      rollers.forEach((roller) => {
        roller.classList.add("is-started");
      });
    }, 60);
  };

  applyReset();

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom -10%",
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
