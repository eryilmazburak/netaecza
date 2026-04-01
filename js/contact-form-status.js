(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var status = params.get("form");

    if (!status) {
      return;
    }

    var formBlock = document.querySelector(".contact_form-block.w-form");

    if (!formBlock) {
      return;
    }

    var form = formBlock.querySelector("form");
    var successBox = formBlock.querySelector(".w-form-done");
    var errorBox = formBlock.querySelector(".w-form-fail");
    var errorText = errorBox ? errorBox.querySelector("div") : null;
    var message = params.get("message");

    if (status === "success") {
      if (form) {
        form.style.display = "none";
      }

      if (errorBox) {
        errorBox.style.display = "none";
      }

      if (successBox) {
        successBox.style.display = "block";
        successBox.setAttribute("tabindex", "-1");
        successBox.focus();
      }

      return;
    }

    if (status === "error") {
      if (form) {
        form.style.display = "";
      }

      if (successBox) {
        successBox.style.display = "none";
      }

      if (errorText && message) {
        errorText.textContent = message;
      }

      if (errorBox) {
        errorBox.style.display = "block";
        errorBox.setAttribute("tabindex", "-1");
        errorBox.focus();
      }
    }
  });
})();
