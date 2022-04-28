/**
 * Use [data-accordion] tag in the parent node of every element
 *
 * @example
 * <div data-accordion>
 *   <div>...</div>
 *   <div>...</div>
 *   <div>...</div>
 * </div>
 */

function accordion() {
  const selectors = document.querySelectorAll("[data-accordion]");
  selectors.forEach((container) => {
    const details = Array.from(container.querySelectorAll("details"));

    if (details.length) {
      details.forEach((detail) =>
        detail.addEventListener("click", (e) => {
          const active = details.find((d) => d.open);
          if (!e.currentTarget.open && active) {
            active.open = false;
          }
        })
      );
    }
  });
}

accordion()
