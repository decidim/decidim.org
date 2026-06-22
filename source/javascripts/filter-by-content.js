/**
 * Use [data-filter] tag in some parent node relative of the input search and the content to filter
 * Use [data-filter-target] tag in the nodes to filter
 *
 * @example
 *  <div data-filter>
 *    <input type="text">
 *    <div data-filter-target>...</div>
 *    <div data-filter-target>...</div>
 *    <div data-filter-target>...</div>
 *  </div>
 */
const handleClick = ({ target }) => {
  const parent = target.closest("[data-filter]");
  const { value } = target;
  if (parent) {
    [...parent.querySelectorAll("[data-filter-target]")].forEach((x) => {
      const matches = x.textContent.match(new RegExp(value, "i"));
      if (!matches) {
        x.setAttribute("hidden", true);
      } else {
        x.removeAttribute("hidden");
        const details = x.closest("details");
        if (details && value) {
          details.setAttribute("open", "");
        }
      }
    });

    // Close empty sections when search is cleared
    if (!value) {
      parent.querySelectorAll("details").forEach((d) => d.removeAttribute("open"));
    }
  }
};

/**
 * Initializes filter functionality by attaching input event listeners to all elements with [data-filter] attribute.
 */
const filterContent = () => {
  const selectors = document.querySelectorAll("[data-filter]");
  selectors.forEach((container) => container.addEventListener("input", handleClick));
};

filterContent();
