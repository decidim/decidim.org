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
const caseStudyFilter = () => {
  let CARDS_PER_PAGE = 6;

  let grid = document.getElementById("cs-grid");
  if (!grid)
  {return;}

  let searchInput   = document.querySelector("[data-cs-search]");
  let filterToggle  = document.querySelector("[data-cs-filter-toggle]");
  let filterPanel   = document.querySelector("[data-cs-filter-panel]");
  let filterArrow   = document.querySelector("[data-cs-filter-arrow]");
  let filterBadge   = document.querySelector("[data-cs-filter-badge]");
  let clearBtn      = document.querySelector("[data-cs-clear-filters]");
  let typeContainer = document.getElementById("cs-type-checkboxes");
  let countryContainer = document.getElementById("cs-country-checkboxes");
  let paginationEl  = document.getElementById("cs-pagination");
  let noResultsEl   = document.getElementById("cs-no-results");

  let chipsEl = document.getElementById("cs-active-chips");

  let allCards  = Array.from(grid.querySelectorAll("[data-cs-card]"));
  let currentPage = 1;
  let activeTypes     = {};
  let activeCountries = {};
  let panelOpen = false;

  // Unique sorted values
  const uniqueSorted = (attribute) => {
    let seen = {},
        vals = [];
    allCards.forEach(function (card) {
      let v = card.dataset[attribute];
      if (v && !seen[v]) {
        seen[v] = true;
        vals.push(v);
      }
    });
    return vals.sort();
  }

  const onFilterChange = () => {
    currentPage = 1;
    render();
  }

  // Build checkboxes
  const buildCheckboxes = (container, values, activeMap) => {
    if (!container) {
      return;
    }
    container.innerHTML = "";
    values.forEach(function (val) {
      let label = document.createElement("label");
      label.className = "flex items-center gap-2 par-sm text-gray-700 cursor-pointer hover:text-gray-900";

      let cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = val;
      cb.checked = Boolean(activeMap[val]);
      cb.className = "rounded border-gray-300 text-red-500 focus:ring-red-400 w-4 h-4 cursor-pointer";
      cb.addEventListener("change", function () {
        if (this.checked) {
          activeMap[val] = true; }
        else {
          Reflect.deleteProperty(activeMap, val);
        }
        onFilterChange();
      });

      label.appendChild(cb);
      label.appendChild(document.createTextNode(val));
      container.appendChild(label);
    });
  }

  buildCheckboxes(typeContainer,    uniqueSorted("type"),    activeTypes);
  buildCheckboxes(countryContainer, uniqueSorted("country"), activeCountries);

  // Dropdown open / close
  const setPanel = (open) => {
    panelOpen = open;
    if (filterPanel) {
      filterPanel.classList.toggle("hidden", !open);}
    if (filterArrow) {
      filterArrow.style.transform = open
        ? "rotate(180deg)"
        : "";}
  }

  if (filterToggle) {
    filterToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setPanel(!panelOpen);
    });
  }

  document.addEventListener("click", function (e) {
    let dropdown = document.querySelector("[data-cs-filter-dropdown]");
    if (panelOpen && dropdown && !dropdown.contains(e.target)) {
      setPanel(false);
    }
  });

  // Clear filters
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      activeTypes = {};
      activeCountries = {};
      if (searchInput) {
        searchInput.value = "";
      }
      // Uncheck all boxes
      [typeContainer, countryContainer].forEach(function (c) {
        if (c) {
          c.querySelectorAll("input").forEach(function (cb) {
            cb.checked = false; });}
      });
      onFilterChange();
    });
  }

  // Filtering
  const getFilteredCards = () => {
    let search      = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";
    let typesActive = Object.keys(activeTypes).length > 0;
    let countriesActive = Object.keys(activeCountries).length > 0;

    return allCards.filter(function (card) {
      if (typesActive    && !activeTypes[card.dataset.type])        {
        return false;
      }
      if (countriesActive && !activeCountries[card.dataset.country]) {
        return false;
      }
      if (search && card.textContent.toLowerCase().indexOf(search) === -1) {
        return false;
      }
      return true;
    });
  }

  const updateBadgeAndClear = () => {
    let count = Object.keys(activeTypes).length + Object.keys(activeCountries).length;
    if (filterBadge) {
      filterBadge.textContent = count;
      filterBadge.classList.toggle("hidden", count === 0);
    }
    if (clearBtn) {
      clearBtn.classList.toggle("hidden", count === 0);
    }
    if (chipsEl) {
      chipsEl.innerHTML = "";
      const addChip = (val, map, container) => {
        let chip = document.createElement("span");
        chip.className = "inline-flex items-center gap-1 border border-gray-100 bg-gray-100 rounded-lg px-3 py-1 par-sm font-bold text-gray-500";
        chip.textContent = val;
        let x = document.createElement("button");
        x.innerHTML = "&times;";
        x.setAttribute("aria-label", `Remove ${val}`);
        x.className = "ml-1 text-gray-400 hover:text-gray-700 leading-none";
        x.addEventListener("click", function () {
          Reflect.deleteProperty(map, val);
          container.querySelectorAll("input").forEach(function (cb) {
            if (cb.value === val) {
              cb.checked = false;
            }
          });
          onFilterChange();
        });
        chip.appendChild(x);
        chipsEl.appendChild(chip);
      };
      Object.keys(activeTypes).forEach(function (v) {
        addChip(v, activeTypes, typeContainer);
      });
      Object.keys(activeCountries).forEach(function (v) {
        addChip(v, activeCountries, countryContainer);
      });
    }
  }

  // Pagination
  const renderPagination = (totalPages) => {
    if (!paginationEl) {
      return;}
    paginationEl.innerHTML = "";
    if (totalPages <= 1) {
      paginationEl.classList.add("hidden");
      return;
    }
    paginationEl.classList.remove("hidden");

    let base     = "px-4 py-2 rounded-lg par-sm font-medium border transition-colors";
    let active   = `${base} bg-red-500 text-white border-red-500`;
    let inactive = `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-50`;
    let disabled = `${base} bg-white text-gray-300 border-gray-200 cursor-not-allowed`;

    const btn = (label, ariaLabel, onClick, cls) => {
      let b = document.createElement("button");
      b.textContent = label;
      b.setAttribute("aria-label", ariaLabel);
      b.className = cls;
      if (onClick) {
        b.addEventListener("click", onClick);
      } else {
        b.disabled = true;
      }
      paginationEl.appendChild(b);
    }

    btn("←", "Previous page",
      currentPage > 1
        ? function () {
          currentPage--;
          render();
          scrollToGrid(); }
        : null,
      currentPage === 1
        ? disabled
        : inactive);

    const pageWindow = new Set([1, totalPages]);
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageWindow.add(i);
    }
    let prev = 0;
    Array.from(pageWindow).sort((a, b) => a - b).forEach(function (p) {
      if (p - prev > 1) {
        let ellipsis = document.createElement("span");
        ellipsis.textContent = "…";
        ellipsis.className = `${base} border-transparent text-gray-400 cursor-default`;
        paginationEl.appendChild(ellipsis);
      }
      btn(p, `Page ${p}`,
        p !== currentPage
          ? function () { currentPage = p;
            render();
            scrollToGrid(); }
          : null,
        p === currentPage
          ? active
          : inactive);
      prev = p;
    });

    btn("→", "Next page",
      currentPage < totalPages
        ? function () {
          currentPage++;
          render();
          scrollToGrid(); }
        : null,
      currentPage === totalPages
        ? disabled
        : inactive);
  }

  // Render
  const render = () => {
    let filtered   = getFilteredCards();
    let totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let start = (currentPage - 1) * CARDS_PER_PAGE;
    let end   = start + CARDS_PER_PAGE;

    allCards.forEach(function (card) {
      card.style.display = "none";
    });
    filtered.slice(start, end).forEach(function (card) {
      card.style.display = "";
    });

    if (noResultsEl) {
      noResultsEl.classList.toggle("hidden", filtered.length > 0);
    }
    updateBadgeAndClear();
    renderPagination(totalPages);
  }

  const scrollToGrid = () => {
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (searchInput) {
    searchInput.addEventListener("input", onFilterChange);}

  render();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", caseStudyFilter);
} else {
  caseStudyFilter();
}
