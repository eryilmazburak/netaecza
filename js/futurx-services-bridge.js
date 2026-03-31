(() => {
  const section = document.querySelector(".neta-futurx-services.section-feature");
  if (!section) {
    return;
  }

  const cards = Array.from(section.querySelectorAll(".stacking-card"));
  const subheading = section.querySelector(".feature-subheading");

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
      start: "top 72%",
      onEnter: activate,
      onEnterBack: activate,
      onLeaveBack: deactivate,
    });

    if (subheading) {
      window.gsap.fromTo(
        subheading,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
          },
        }
      );
    }

    cards.forEach((card, index) => {
      const image = card.querySelector(".img-card");
      const nextCard = cards[index + 1];

      if (image) {
        window.gsap.to(image, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top 15%",
            scrub: 0.8,
          },
        });
      }

      if (!nextCard) {
        return;
      }

      window.gsap.to(card, {
        scale: 0.965 - index * 0.015,
        y: -18 - index * 8,
        filter: "blur(0.6px)",
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top 82%",
          end: "top 28%",
          scrub: 0.9,
        },
      });
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
