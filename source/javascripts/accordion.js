/**
 * Use [data-accordion] tag in the parent node of every element
 * Use [data-accordion-id=UNIQUE_ID] tag in the items, setting an unique id
 *
 * @example
 * <div data-accordion>
 *   <div data-accordion-id="value1">...</div>
 *   <div data-accordion-id="value2">...</div>
 *   <div data-accordion-id="value3">...</div>
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
      getAccordionId(node) === itemId && !node.classList.contains(ACTIVE_CSS_CLASS)
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
