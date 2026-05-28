/**
 * Toggles the active class on the header element when the toggle button is clicked.
 * @returns {void}
 */
const header = function() {
  const selector = document.querySelector("[data-toggle-header]")
  const ACTIVE_CLASS = "is-active"

  selector.addEventListener("click", () => {
    const headerElement = document.querySelector("header")
    headerElement.classList.toggle(ACTIVE_CLASS)
  })
}

header()
