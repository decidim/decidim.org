/**
 * Case study filter, dropdown and pagination.
 *
 * Use [data-cs-search] on the search input.
 * Use [data-cs-filter-dropdown] on the wrapper div.
 * Use [data-cs-filter-toggle] on the toggle button.
 * Use [data-cs-filter-panel] on the dropdown panel.
 * Use [data-cs-filter-arrow] on the chevron icon inside the toggle.
 * Use [data-cs-filter-badge] on the active-count badge.
 * Use [data-cs-clear-filters] on the clear button.
 * Use id="cs-type-checkboxes" and id="cs-country-checkboxes" for checkbox containers.
 * Use [data-cs-card] data-type="…" data-country="…" on each card.
 * Use id="cs-grid" on the cards container.
 * Use id="cs-pagination" for the pagination container.
 * Use id="cs-no-results" for the empty-state message.
 */
(function () {
  var CARDS_PER_PAGE = 6;

  var grid = document.getElementById("cs-grid");
  if (!grid) return;

  var searchInput   = document.querySelector("[data-cs-search]");
  var filterToggle  = document.querySelector("[data-cs-filter-toggle]");
  var filterPanel   = document.querySelector("[data-cs-filter-panel]");
  var filterArrow   = document.querySelector("[data-cs-filter-arrow]");
  var filterBadge   = document.querySelector("[data-cs-filter-badge]");
  var clearBtn      = document.querySelector("[data-cs-clear-filters]");
  var typeContainer = document.getElementById("cs-type-checkboxes");
  var countryContainer = document.getElementById("cs-country-checkboxes");
  var paginationEl  = document.getElementById("cs-pagination");
  var noResultsEl   = document.getElementById("cs-no-results");

  var allCards  = Array.from(grid.querySelectorAll("[data-cs-card]"));
  var currentPage = 1;
  var activeTypes     = {};
  var activeCountries = {};
  var panelOpen = false;

  // ── Unique sorted values ──────────────────────────────────────────────────
  function uniqueSorted(attribute) {
    var seen = {}, vals = [];
    allCards.forEach(function (card) {
      var v = card.dataset[attribute];
      if (v && !seen[v]) { seen[v] = true; vals.push(v); }
    });
    return vals.sort();
  }

  // ── Build checkboxes ──────────────────────────────────────────────────────
  function buildCheckboxes(container, values, activeMap) {
    if (!container) return;
    container.innerHTML = "";
    values.forEach(function (val) {
      var label = document.createElement("label");
      label.className = "flex items-center gap-2 par-sm text-gray-700 cursor-pointer hover:text-gray-900";

      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = val;
      cb.checked = !!activeMap[val];
      cb.className = "rounded border-gray-300 text-red-500 focus:ring-red-400 w-4 h-4 cursor-pointer";
      cb.addEventListener("change", function () {
        if (this.checked) { activeMap[val] = true; }
        else { delete activeMap[val]; }
        onFilterChange();
      });

      label.appendChild(cb);
      label.appendChild(document.createTextNode(val));
      container.appendChild(label);
    });
  }

  buildCheckboxes(typeContainer,    uniqueSorted("type"),    activeTypes);
  buildCheckboxes(countryContainer, uniqueSorted("country"), activeCountries);

  // ── Dropdown open / close ─────────────────────────────────────────────────
  function setPanel(open) {
    panelOpen = open;
    if (filterPanel) filterPanel.classList.toggle("hidden", !open);
    if (filterArrow) filterArrow.style.transform = open ? "rotate(180deg)" : "";
  }

  if (filterToggle) {
    filterToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setPanel(!panelOpen);
    });
  }

  document.addEventListener("click", function (e) {
    var dropdown = document.querySelector("[data-cs-filter-dropdown]");
    if (panelOpen && dropdown && !dropdown.contains(e.target)) {
      setPanel(false);
    }
  });

  // ── Clear filters ─────────────────────────────────────────────────────────
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      activeTypes = {};
      activeCountries = {};
      if (searchInput) searchInput.value = "";
      // Uncheck all boxes
      [typeContainer, countryContainer].forEach(function (c) {
        if (c) c.querySelectorAll("input").forEach(function (cb) { cb.checked = false; });
      });
      onFilterChange();
    });
  }

  // ── Filtering ─────────────────────────────────────────────────────────────
  function getFilteredCards() {
    var search      = searchInput ? searchInput.value.toLowerCase().trim() : "";
    var typesActive = Object.keys(activeTypes).length > 0;
    var countriesActive = Object.keys(activeCountries).length > 0;

    return allCards.filter(function (card) {
      if (typesActive    && !activeTypes[card.dataset.type])        return false;
      if (countriesActive && !activeCountries[card.dataset.country]) return false;
      if (search && card.textContent.toLowerCase().indexOf(search) === -1) return false;
      return true;
    });
  }

  function updateBadgeAndClear() {
    var count = Object.keys(activeTypes).length + Object.keys(activeCountries).length;
    if (filterBadge) {
      filterBadge.textContent = count;
      filterBadge.classList.toggle("hidden", count === 0);
    }
    if (clearBtn) clearBtn.classList.toggle("hidden", count === 0);
  }

  // ── Pagination ────────────────────────────────────────────────────────────
  function renderPagination(totalPages) {
    if (!paginationEl) return;
    paginationEl.innerHTML = "";
    if (totalPages <= 1) { paginationEl.classList.add("hidden"); return; }
    paginationEl.classList.remove("hidden");

    var base     = "px-4 py-2 rounded-lg par-sm font-medium border transition-colors";
    var active   = base + " bg-red-500 text-white border-red-500";
    var inactive = base + " bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
    var disabled = base + " bg-white text-gray-300 border-gray-200 cursor-not-allowed";

    function btn(label, ariaLabel, onClick, cls) {
      var b = document.createElement("button");
      b.textContent = label;
      b.setAttribute("aria-label", ariaLabel);
      b.className = cls;
      if (onClick) b.addEventListener("click", onClick); else b.disabled = true;
      paginationEl.appendChild(b);
    }

    btn("←", "Previous page",
      currentPage > 1 ? function () { currentPage--; render(); scrollToGrid(); } : null,
      currentPage === 1 ? disabled : inactive);

    for (var i = 1; i <= totalPages; i++) {
      (function (p) {
        btn(p, "Page " + p,
          p !== currentPage ? function () { currentPage = p; render(); scrollToGrid(); } : null,
          p === currentPage ? active : inactive);
      })(i);
    }

    btn("→", "Next page",
      currentPage < totalPages ? function () { currentPage++; render(); scrollToGrid(); } : null,
      currentPage === totalPages ? disabled : inactive);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function render() {
    var filtered   = getFilteredCards();
    var totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    var start = (currentPage - 1) * CARDS_PER_PAGE;
    var end   = start + CARDS_PER_PAGE;

    allCards.forEach(function (card) { card.hidden = true; });
    filtered.slice(start, end).forEach(function (card) { card.hidden = false; });

    if (noResultsEl) noResultsEl.classList.toggle("hidden", filtered.length > 0);
    updateBadgeAndClear();
    renderPagination(totalPages);
  }

  function scrollToGrid() {
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onFilterChange() {
    currentPage = 1;
    render();
  }

  if (searchInput) searchInput.addEventListener("input", onFilterChange);

  render();
})();
