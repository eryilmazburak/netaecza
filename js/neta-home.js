document.addEventListener("DOMContentLoaded", function () {
  var section = document.querySelector(".neta-operations");

  if (!section) {
    return;
  }

  var cards = Array.prototype.slice.call(
    section.querySelectorAll(".wrapper-block-project.home-2[data-operation]")
  );
  var images = Array.prototype.slice.call(
    section.querySelectorAll(".image-mask[data-operation-image]")
  );

  if (!cards.length || !images.length) {
    return;
  }

  function setActive(operationId) {
    cards.forEach(function (card) {
      card.classList.toggle("is-active", card.dataset.operation === operationId);
    });

    images.forEach(function (image) {
      image.classList.toggle(
        "is-active",
        image.dataset.operationImage === operationId
      );
    });
  }

  var defaultOperation = cards[0].dataset.operation;
  setActive(defaultOperation);

  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      setActive(card.dataset.operation);
    });

    card.addEventListener("focusin", function () {
      setActive(card.dataset.operation);
    });
  });

  section.addEventListener("mouseleave", function () {
    setActive(defaultOperation);
  });
});
