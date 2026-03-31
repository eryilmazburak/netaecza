(() => {
  const section = document.querySelector(".neta-seric-about");
  if (!section) {
    return;
  }

  const setDelay = (element) => {
    const delay = element.getAttribute("data-seric-delay");
    if (delay) {
      element.style.setProperty("--seric-delay", `${delay}ms`);
    }
  };

  const revealElement = (element) => {
    setDelay(element);
    element.classList.add("is-visible");
    if (element.style && element.style.opacity === "0") {
      element.style.opacity = "1";
    }
  };

  const startRoll = (element) => {
    element.classList.add("is-started");
  };

  const startIconSpin = () => {
    const icon = section.querySelector(".about-icon");
    if (icon && !icon.classList.contains("is-spinning")) {
      icon.classList.add("is-spinning");
    }
  };

  const reveals = Array.from(section.querySelectorAll(".seric-reveal"));
  const rollers = Array.from(section.querySelectorAll("[data-seric-roll='true']"));

  const startSectionAnimations = () => {
    startIconSpin();
    reveals.forEach(revealElement);
    rollers.forEach(startRoll);
  };

  if (!("IntersectionObserver" in window)) {
    startSectionAnimations();
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        startSectionAnimations();
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  reveals.forEach(setDelay);

  sectionObserver.observe(section);
})();
