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
function handleClick({ target }) {
  const parent = target.closest(`[data-filter]`);
  const { value } = target;

  if (parent) {
    [...parent.querySelectorAll(`[data-filter-target]`)].map((x) =>
      !x.textContent.match(new RegExp(value, "i")) ? x.setAttribute("hidden", true) : x.removeAttribute("hidden")
    );
  }
}

function filterContent() {
  const selectors = document.querySelectorAll("[data-filter]");
  selectors.forEach(container => container.addEventListener("input", handleClick));
}

filterContent();
