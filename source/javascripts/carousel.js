/**
 * Initialises drag-to-scroll behaviour on all elements marked with
 * [data-scroll-gallery]. Supports mouse (click & drag) and touch (swipe).
 *
 * @returns {void}
 */

const scrollGallery = function () {
  const galleries = document.querySelectorAll("[data-scroll-gallery]");
  galleries.forEach((gallery) => {
    const track = gallery.querySelector("[data-scroll-track]");

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const pauseAnimation = () => {
      if (track) {
        track.style.animationPlayState = "paused";
      }
    };

    const resumeAnimation = () => {
      if (track) {
        track.style.animationPlayState = "running";
      }
    };

    gallery.addEventListener("mousedown", (e) => {
      isDown = true;
      pauseAnimation();
      gallery.classList.add("cursor-grabbing");
      gallery.classList.remove("cursor-grab");
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener("mouseleave", () => {
      isDown = false;
      resumeAnimation();
      gallery.classList.remove("cursor-grabbing");
      gallery.classList.add("cursor-grab");
    });

    gallery.addEventListener("mouseup", () => {
      isDown = false;
      resumeAnimation();
      gallery.classList.remove("cursor-grabbing");
      gallery.classList.add("cursor-grab");
    });

    gallery.addEventListener("mousemove", (e) => {
      if (!isDown) {
        return;
      }
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });

    gallery.addEventListener("touchstart", (e) => {
      pauseAnimation();
      startX = e.touches[0].pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    }, { passive: true });

    gallery.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX - gallery.offsetLeft;
      gallery.scrollLeft = scrollLeft - (x - startX);
    }, { passive: true });

    gallery.addEventListener("touchend", () => {
      resumeAnimation();
    }, { passive: true });
  });
};
scrollGallery();
