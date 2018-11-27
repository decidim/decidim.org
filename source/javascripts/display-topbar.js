function displayTopbar() {
  var homePage = document.querySelector('.home'),
    topBar = document.querySelector('.topbar'),
    scrollElement = document.querySelector('.hero'),
    visibleClass = 'topbar--is-visible'

  if (!homePage) {
    return
  }
  function checkTopBar() {
    var scrollPosition = scrollElement.getBoundingClientRect().bottom
    if (scrollPosition <= 0) {
      topBar.classList.add(visibleClass)
    } else {
      topBar.classList.remove(visibleClass)
    }
  }

  window.addEventListener('scroll', checkTopBar)
}

displayTopbar()
