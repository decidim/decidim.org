/**
 * Switches the main gallery image and updates thumbnail active states.
 *
 * @param {HTMLElement} thumb - The clicked thumbnail element.
 * @param {string} thumb.dataset.src - Image URL to display in the main view.
 * @param {string} thumb.dataset.alt - Alt text for the selected image.
 * @returns {void}
 */

const selectGalleryImage = function (thumb) {
  const main = document.querySelector("[data-gallery='main'] img");
  main.src = thumb.dataset.src;
  main.alt = thumb.dataset.alt;

  document.querySelectorAll("[data-gallery-thumb] [data-overlay]").forEach((overlay) => {
    overlay.classList.remove("opacity-0");
    overlay.classList.add("opacity-100");
  });

  thumb.querySelector("[data-overlay]").classList.remove("opacity-100");
  thumb.querySelector("[data-overlay]").classList.add("opacity-0");
};

window.selectGalleryImage = selectGalleryImage;
