/**
 * Initialises drag-to-scroll behaviour on all elements marked with
 * [data-scroll-gallery]. Supports mouse (click & drag) and touch (swipe).
 *
 * Cursor position relative to the gallerys left edge
 * used to calculate the distance moved during a drag/swipe.
 *
 * @returns {void}
 */

const scrollGallery = function () {
  const galleries = document.querySelectorAll("[data-scroll-gallery]");
  galleries.forEach((gallery) => {
    const track = gallery.querySelector("[data-scroll-track]");
    if (!track) {
      return;
    }

    let isDown = false;
    let startX = 0;
    let startTranslateX = 0;

    const getTranslateX = () => {
      const transform = window.getComputedStyle(track).transform;
      if (transform === "none") {
        return 0;
      }
      const match = transform.match(/matrix.*\((.+)\)/);
      if (!match) {
        return 0;
      }
      const values = match[1].split(", ");
      return parseFloat(values[4]) || 0;
    };

    const startDrag = (pageX) => {
      isDown = true;
      startX = pageX - gallery.offsetLeft;
      startTranslateX = getTranslateX();
      track.classList.remove("animate-slide-x");
      track.style.transform = `translateX(${startTranslateX}px)`;
    };

    const endDrag = () => {
      if (!isDown) {
        return;
      }
      isDown = false;

      const currentTx = getTranslateX();

      const targetStr =
        getComputedStyle(track).getPropertyValue("--translate-x") || "-50%";
      const targetFraction = parseFloat(targetStr) / 100;
      const targetPx = targetFraction * track.scrollWidth;
      const duration =
        parseFloat(getComputedStyle(track).animationDuration) || 15;

      let progress = targetPx !== 0
        ? currentTx / targetPx
        : 0;
      progress = ((progress % 1) + 1) % 1;

      track.style.animationDelay = `${-duration * progress}s`;
      track.style.transform = "";
      track.classList.add("animate-slide-x");
    };

    gallery.addEventListener("mousedown", (e) => {
      startDrag(e.pageX);
      gallery.classList.add("cursor-grabbing");
      gallery.classList.remove("cursor-grab");
    });

    gallery.addEventListener("mouseleave", () => {
      if (!isDown) {
        return;
      }
      endDrag();
      gallery.classList.remove("cursor-grabbing");
      gallery.classList.add("cursor-grab");
    });

    gallery.addEventListener("mouseup", () => {
      endDrag();
      gallery.classList.remove("cursor-grabbing");
      gallery.classList.add("cursor-grab");
    });

    gallery.addEventListener("mousemove", (e) => {
      if (!isDown) {
        return;
      }
      e.preventDefault();
      const xAxis = e.pageX - gallery.offsetLeft;
      const walk = (xAxis - startX) * 1.5;
      track.style.transform = `translateX(${startTranslateX + walk}px)`;
    });

    gallery.addEventListener("touchstart", (e) => {
      startDrag(e.touches[0].pageX);
    }, { passive: true });

    gallery.addEventListener("touchmove", (e) => {
      const xAxis = e.touches[0].pageX - gallery.offsetLeft;
      const walk = (xAxis - startX) * 1.5;
      track.style.transform = `translateX(${startTranslateX + walk}px)`;
    }, { passive: true });

    gallery.addEventListener("touchend", () => {
      endDrag();
    }, { passive: true });
  });
};
scrollGallery();
