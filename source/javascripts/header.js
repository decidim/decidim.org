function header() {
  const selector = document.querySelector("[data-toggle-header]")
  const ACTIVE_CLASS = "is-active"

  selector.addEventListener("click", () => {
    const selector = document.querySelector("header")
    selector.classList.toggle(ACTIVE_CLASS)
  })
}

header()
