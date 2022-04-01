/**
 * Use [data-tabs] tag in some parent node relative of the tabs and their contents
 * Use [data-filter-id=UNIQUE_ID] tag in the tabs, setting the unique id
 * Use [data-filter-content=UNIQUE_ID] tag in content relative to the tab id
 *
 * @example
 * <div data-tabs="type">
 *   <ul>
 *     <li data-tab-id="value1">...</li>
 *     <li data-tab-id="value2">...</li>
 *     <li data-tab-id="value3">...</li>
 *   </ul>
 *   <div data-tab-content="value1">...</div>
 *   <div data-tab-content="value1">...</div>
 *   <div data-tab-content="value1">...</div>
 * </div>
 */
function getAccordionId(node) {
  const { dataset: { accordionId } = {}} = node || {}
  return accordionId
}

function handleAccordionClick({ target }) {
  const accordion = target.closest("[data-accordion]")
  const item = target.closest("[data-accordion-id]")

  if (item) {
    const ACTIVE_CSS_CLASS = "is-selected";
    const itemId = getAccordionId(item);

    [...accordion.children].forEach((node) =>
      getAccordionId(node) === itemId
        ? node.classList.add(ACTIVE_CSS_CLASS)
        : node.classList.remove(ACTIVE_CSS_CLASS)
    );
  }
}

function accordion() {
  const selectors = document.querySelectorAll("[data-accordion]")
  selectors.forEach(container => container.addEventListener("click", handleAccordionClick))
}

accordion()
