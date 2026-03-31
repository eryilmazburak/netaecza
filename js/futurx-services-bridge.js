(() => {
  const section = document.querySelector(".neta-futurx-services.section-feature");
  if (!section) {
    return;
  }

  const activate = () => {
    section.classList.add("visible");
  };

  const deactivate = () => {
    section.classList.remove("visible");
  };

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.ScrollTrigger.create({
      trigger: section,
      start: "400px 40%",
      onEnter: activate,
      onEnterBack: activate,
      onLeaveBack: deactivate,
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    activate();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate();
          return;
        }
        deactivate();
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -20% 0px",
    }
  );

  observer.observe(section);
})();
