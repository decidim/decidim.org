document.querySelectorAll("[data-nav-link]").forEach(function(link) {
  link.addEventListener("click", function() {
    setActiveLink(this.getAttribute("href"));
    this.closest("details").open = false;
  });
});

var desktopLinks = document.querySelectorAll("[data-desktop-nav-link]");
var mobileLinks = document.querySelectorAll("[data-nav-link]");

function setActiveLink(href) {
  desktopLinks.forEach(function(l) {
    if (l.getAttribute("href") === href) {
      l.classList.add("bg-red-100");
      l.classList.remove("bg-red-50");
    } else {
      l.classList.remove("bg-red-100");
      l.classList.add("bg-red-50");
    }
  });

  mobileLinks.forEach(function(l) {
    if (l.getAttribute("href") === href) {
      l.classList.add("font-bold", "bg-red-100");
      l.classList.remove("font-normal");
      var label = l.closest("details") && l.closest("details").querySelector("[data-dropdown-label]");
      if (label) label.textContent = l.textContent.trim();
    } else {
      l.classList.remove("font-bold", "bg-red-100");
      l.classList.add("font-normal");
    }
  });
}

var sectionIds = ["official", "community", "auth"];

function updateActiveSection() {
  var current = sectionIds[0];
  for (var i = 0; i < sectionIds.length; i++) {
    var el = document.getElementById(sectionIds[i]);
    if (el && el.getBoundingClientRect().top <= 100) {
      current = sectionIds[i];
    }
  }
  setActiveLink("#" + current);
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
updateActiveSection();
