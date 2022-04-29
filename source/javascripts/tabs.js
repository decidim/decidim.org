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

function getTabId(node) {
  const { dataset: { tabId, tabContent } = {}} = node || {}
  return tabId || tabContent
}

function setSelection({ parent, activeId }) {
  const ids = parent.querySelectorAll(`[data-tab-id]`)
  const contents = parent.querySelectorAll(`[data-tab-content]`)
  const ACTIVE_CSS_CLASS = "is-selected"

  ids.forEach((node) => getTabId(node) === activeId ? node.classList.add(ACTIVE_CSS_CLASS) : node.classList.remove(ACTIVE_CSS_CLASS))
  contents.forEach((node) => getTabId(node) === activeId ? node.classList.add(ACTIVE_CSS_CLASS) : node.classList.remove(ACTIVE_CSS_CLASS))
}

function handleTabClick({ event: { target }, type }) {
  const parent = target.closest(`[data-tabs=${type}]`);
  const activeId = getTabId(target.closest("[data-tab-id]"));

  if (parent && activeId) {
    setSelection({ parent, activeId });
  }
}

function handleTouch({ event: { target }, startX, endX, type }) {
  const parent = target.closest(`[data-tabs=${type}]`);
  const activeId = getTabId(target.closest("[data-tab-id]") || target.closest("[data-tab-content]"));
  const slides = [...new Set(Array.from(parent.querySelectorAll("[data-tab-id]")).map(getTabId))]

  if (!parent || !activeId || !slides.length) return false

  const i = slides.findIndex(x => x === activeId)
  const prev = slides[i == 0 ? slides.length - 1 : i - 1];
  const next = slides[i == slides.length - 1 ? 0 : i + 1];
  return endX - startX < 0
    ? setSelection({ parent, activeId: next })
    : setSelection({ parent, activeId: prev });
}

function tabs() {
  const selectors = document.querySelectorAll("[data-tabs]")
  selectors.forEach(container => {
    container.addEventListener("click", (event) => handleTabClick({ event, type: container.dataset.tabs }));
    container.addEventListener("pointerover", (event) => handleTabClick({ event, type: container.dataset.tabs }));

    let startX;
    let endX;
    container.addEventListener("touchstart", event => (startX = event.touches[0].clientX));
    container.addEventListener("touchend", function (event) {
      endX = event.changedTouches[0].clientX;
      handleTouch({ event, startX, endX, type: container.dataset.tabs });
    });
  })
}

tabs()
