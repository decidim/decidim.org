const ACTIVE_CSS_CLASS = "is-selected"

function getTabId(node) {
  const { dataset: { tabId, tabContent }} = node || {}
  return tabId || tabContent
}

function handleTabClick({ target }, tabType) {
  const parent = target.closest(`[data-tabs=${tabType}]`)

  if (parent) {
    const ids = parent.querySelectorAll(`[data-tab-id]`)
    const contents = parent.querySelectorAll(`[data-tab-content]`)
    const tabId = getTabId(target.closest("[data-tab-id]"))

    ids.forEach((node) => getTabId(node) === tabId ? node.classList.add(ACTIVE_CSS_CLASS) : node.classList.remove(ACTIVE_CSS_CLASS))
    contents.forEach((node) => getTabId(node) === tabId ? node.classList.add(ACTIVE_CSS_CLASS) : node.classList.remove(ACTIVE_CSS_CLASS))
  }
}

function tabs() {
  const selectors = document.querySelectorAll("[data-tabs]")
  selectors.forEach(tabs => {
    tabs.addEventListener("click", e => handleTabClick(e, tabs.dataset.tabs))
    tabs.addEventListener("pointerover", e => handleTabClick(e, tabs.dataset.tabs))
  })
}

tabs()
