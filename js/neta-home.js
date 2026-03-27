document.addEventListener("DOMContentLoaded", function () {
  var shell = document.querySelector(".neta-operations-shell");

  if (!shell) {
    return;
  }

  var cards = Array.prototype.slice.call(
    shell.querySelectorAll(".neta-operations-card[data-operation]")
  );
  var images = Array.prototype.slice.call(
    shell.querySelectorAll(".neta-operations-media-card[data-operation-image]")
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

  shell.addEventListener("mouseleave", function () {
    setActive(defaultOperation);
  });
});
