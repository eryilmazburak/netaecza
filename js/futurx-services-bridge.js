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

    cards.forEach((card) => {
      window.gsap.set(card, {
        force3D: true,
        transformPerspective: 1000,
      });
    });

    window.ScrollTrigger.create({
      trigger: section,
      start: "top 76%",
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
            start: "top 78%",
            toggleActions: "play none none reverse",
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
          yPercent: -2,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top 18%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      if (!nextCard) {
        return;
      }

      window.gsap.to(card, {
        scale: 0.972 - index * 0.012,
        y: -24 - index * 10,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top 86%",
          end: "top 34%",
          scrub: 1.15,
          invalidateOnRefresh: true,
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
