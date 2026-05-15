/**
 * @fileoverview Gallery component for managing image selection and thumbnail states.
 */

/**
 * Switches the main gallery image and updates thumbnail active states.
 *
 * @param {HTMLElement} thumb - The clicked thumbnail element.
 * @param {string} thumb.dataset.src - Image URL to display in the main view.
 * @param {string} thumb.dataset.alt - Alt text for the selected image.
 * @returns {void}
 */

function selectGalleryImage(thumb) {
  const main = document.querySelector('#main-gallery-image img');
  main.src = thumb.dataset.src;
  main.alt = thumb.dataset.alt;

  document.querySelectorAll('.gallery-thumb .thumb-overlay').forEach(overlay => {
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');
  });

  thumb.querySelector('.thumb-overlay').classList.remove('opacity-100');
  thumb.querySelector('.thumb-overlay').classList.add('opacity-0');
}
