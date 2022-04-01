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

function handleTabClick({ target }, tabType) {
  const parent = target.closest(`[data-tabs=${tabType}]`)
  const tabId = getTabId(target.closest("[data-tab-id]"))

  if (parent && tabId) {
    const ids = parent.querySelectorAll(`[data-tab-id]`)
    const contents = parent.querySelectorAll(`[data-tab-content]`)
    const ACTIVE_CSS_CLASS = "is-selected"

    ids.forEach((node) => getTabId(node) === tabId ? node.classList.add(ACTIVE_CSS_CLASS) : node.classList.remove(ACTIVE_CSS_CLASS))
    contents.forEach((node) => getTabId(node) === tabId ? node.classList.add(ACTIVE_CSS_CLASS) : node.classList.remove(ACTIVE_CSS_CLASS))
  }
}

function tabs() {
  const selectors = document.querySelectorAll("[data-tabs]")
  selectors.forEach(container => {
    container.addEventListener("click", e => handleTabClick(e, container.dataset.tabs))
    container.addEventListener("pointerover", e => handleTabClick(e, container.dataset.tabs))
  })
}

tabs()
