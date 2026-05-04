/**
 * Drop down navigation with active state sync for desktop and mobile.
 *
 * Use [data-desktop-nav-link] for desktop anchors.
 * Use [data-nav-link] inside a <details> for mobile dropdown links.
 * Use [data-dropdown-label] on the element that mirrors the active link text.
 * Use [data-arrow] wrapping an <svg> for the open/close rotation effect.
 * Add section IDs to the `sectionIds` array to enable scroll tracking.
 *
 * @example
 *  ----------- Desktop nav -----------
 *  <nav>
 *    <a href="#official" data-desktop-nav-link>Official</a>
 *    <a href="#community" data-desktop-nav-link>Community</a>
 *    <a href="#auth" data-desktop-nav-link>Auth</a>
 *  </nav>
 *
 *  ----------- Mobile dropdown nav -----------
 *  <details>
 *    <summary>
 *      <span data-dropdown-label>Official</span>
 *      <span data-arrow><svg>...</svg></span>
 *    </summary>
 *    <a href="#official" data-nav-link>Official</a>
 *    <a href="#community" data-nav-link>Community</a>
 *    <a href="#auth" data-nav-link>Auth</a>
 *  </details>
 *
 *  ----------- Sections -----------
 *  <section id="official">...</section>
 *  <section id="community">...</section>
 *  <section id="auth">...</section>
 */

document.querySelectorAll("[data-nav-link]").forEach(function(link) {
  link.addEventListener("click", function() {
    setActiveLink(this.getAttribute("href"));
    this.closest("details").open = false;
  });
});

const desktopLinks = document.querySelectorAll("[data-desktop-nav-link]");
const mobileLinks = document.querySelectorAll("[data-nav-link]");
const sectionIds = ["official", "community", "auth"];
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

document.querySelectorAll("details").forEach(function(details) {
  details.addEventListener("toggle", function() {
    var arrow = details.querySelector("[data-arrow] svg");
    if (details.open) {
      arrow.style.transform = "rotate(180deg)";
    } else {
      arrow.style.transform = "rotate(0deg)";
    }
  });
});
window.addEventListener("scroll", updateActiveSection, { passive: true });

updateActiveSection();
