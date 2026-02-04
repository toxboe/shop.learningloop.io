(() => {
  const selector = "[data-vat-note]";
  const updateNote = async (input) => {
    if (!input) return;
    const value = input.value || "";
    if (input.dataset.vatNoteValue === value) return;
    input.dataset.vatNoteValue = value;

    try {
      await fetch("/cart/update.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ note: value }),
      });
    } catch (error) {
      console.warn("Failed to update VAT note", error);
    }
  };

  const bindInputs = (root = document) => {
    root.querySelectorAll(selector).forEach((input) => {
      input.dataset.vatNoteValue = input.value || "";
      input.addEventListener("change", () => updateNote(input));
      input.addEventListener("blur", () => updateNote(input));
    });
  };

  document.addEventListener("DOMContentLoaded", () => bindInputs());
  document.addEventListener("shopify:section:load", (event) => {
    bindInputs(event.target);
  });
})();
