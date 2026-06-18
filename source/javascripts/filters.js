/**
 * Manages filtering and pagination for pages that need to utilise filtering.
 * Handles search, type filters, pagination, and active filter pills under the search.
 * Initializes on DOM ready or immediately if document is already loaded.
 */

const caseStudyFilter = () => {
  const CARDS_PER_PAGE = 6;
  const grid = document.getElementById("cs-grid");
  if (!grid) {
    return;
  }

  const $  = (sel) => document.querySelector(sel);
  const $$ = (el, sel) => Array.from(el.querySelectorAll(sel));

  const searchInput      = $("[data-cs-search]");
  const filterToggle     = $("[data-cs-filter-toggle]");
  const filterPanel      = $("[data-cs-filter-panel]");
  const filterArrow      = $("[data-cs-filter-arrow]");
  const filterBadge      = $("[data-cs-filter-badge]");
  const clearBtn         = $("[data-cs-clear-filters]");
  const typeContainer    = document.getElementById("cs-type-checkboxes");
  const countryContainer = document.getElementById("cs-country-checkboxes");
  const paginationEl     = document.getElementById("cs-pagination");
  const noResultsEl      = document.getElementById("cs-no-results");
  const chipsEl          = document.getElementById("cs-active-chips");
  const allCards         = $$(grid, "[data-cs-card]");

  let currentPage = 1;
  let panelOpen   = false;
  const activeTypes     = {};
  const activeCountries = {};

  const CLS = {
    pageActive: "w-9 h-9 rounded-full bg-red-100 text-red-500 font-semibold text-sm flex items-center justify-center",
    pageInactive: "w-9 h-9 rounded-full text-red-500 font-medium text-sm flex items-center justify-center hover:bg-gray-100 transition-colors",
    prev: "flex items-center gap-2 px-5 py-2 rounded-lg border-2 border-red-400 text-red-500 font-medium text-sm hover:bg-red-50 transition-colors mr-3",
    next: "flex items-center gap-2 px-5 py-2 rounded-lg border-2 border-red-400 text-red-500 font-medium text-sm hover:bg-red-50 transition-colors ml-3",
    ellipsis: "w-9 h-9 flex items-center justify-center text-gray-400 text-sm",
    chip: "inline-flex items-center gap-1 border border-gray-100 bg-gray-100 rounded-lg px-3 py-1 par-sm font-bold text-gray-500",
    chipX: "pl-1 text-2xl font-bold text-gray-400 hover:text-gray-700 leading-none",
    checkbox: "rounded border-gray-300 text-red-500 focus:ring-red-400 w-4 h-4 cursor-pointer",
    checkLabel: "flex items-center gap-2 par-sm text-gray-700 cursor-pointer hover:text-gray-900"
  };

  const F = {};

  const clearMap = (map) => {
    Object.keys(map).forEach((k) => Reflect.deleteProperty(map, k));
  };

  const uniqueSorted = (attr) => {
    return [...new Set(allCards.map((c) => c.dataset[attr]).filter(Boolean))].sort();
  };

  const setPanel = (open) => {
    panelOpen = open;
    filterPanel?.classList.toggle("hidden", !open);
    if (filterArrow) {
      filterArrow.style.transform = open
        ? "rotate(180deg)"
        : "";
    }
  };

  const getFilteredCards = () => {
    const search          = searchInput?.value.toLowerCase().trim() ?? "";
    const typesActive     = Object.keys(activeTypes).length > 0;
    const countriesActive = Object.keys(activeCountries).length > 0;
    return allCards.filter((c) => {
      if (typesActive && !activeTypes[c.dataset.type]) {
        return false;
      }
      if (countriesActive && !activeCountries[c.dataset.country]) {
        return false;
      }
      if (search && !c.textContent.toLowerCase().includes(search)) {
        return false;
      }
      return true;
    });
  };

  const updateBadgeAndClear = () => {
    const count = Object.keys(activeTypes).length + Object.keys(activeCountries).length;
    if (filterBadge) {
      filterBadge.textContent = count;
      filterBadge.classList.toggle("hidden", count === 0);
    }
    clearBtn?.classList.toggle("hidden", count === 0);
    if (!chipsEl) {
      return;
    }
    chipsEl.innerHTML = "";
    const addChip = (val, map, container) => {
      const chip = document.createElement("span");
      chip.className   = CLS.chip;
      chip.textContent = val;
      const x = document.createElement("button");
      x.innerHTML = "&times;";
      x.setAttribute("aria-label", `Remove ${val}`);
      x.className = CLS.chipX;
      x.addEventListener("click", () => {
        Reflect.deleteProperty(map, val);
        container?.querySelectorAll("input").forEach((cb) => {
          if (cb.value === val) {
            cb.checked = false;
          }
        });
        F.onFilterChange();
      });
      chip.appendChild(x);
      chipsEl.appendChild(chip);
    };
    Object.keys(activeTypes).forEach((v) => addChip(v, activeTypes, typeContainer));
    Object.keys(activeCountries).forEach((v) => addChip(v, activeCountries, countryContainer));
  };

  const renderPagination = (totalPages) => {
    if (!paginationEl) {
      return;
    }
    paginationEl.innerHTML = "";
    if (totalPages <= 1) {
      paginationEl.classList.add("hidden");
      return;
    }
    paginationEl.classList.remove("hidden");

    const appendBtn = ({ label, ariaLabel, onClick, cls }) => {
      const b = document.createElement("button");
      b.innerHTML = label;
      b.setAttribute("aria-label", ariaLabel);
      b.className = cls;
      if (onClick) {
        b.addEventListener("click", onClick);
      } else {
        b.disabled = true;
      }
      paginationEl.appendChild(b);
    };

    if (currentPage > 1) {
      appendBtn({
        label: "Prev <i class=\"ri-arrow-left-line text-xl\"></i>",
        ariaLabel: "Previous page",
        onClick: () => F.goToPage(currentPage - 1),
        cls: CLS.prev
      });
    }

    const pageWindow = new Set([1, totalPages]);
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageWindow.add(i);
    }

    let prev = 0;
    Array.from(pageWindow).sort((a, b) => a - b).forEach((p) => {
      if (p - prev > 1) {
        const el = document.createElement("span");
        el.textContent = "\u2026";
        el.className = CLS.ellipsis;
        paginationEl.appendChild(el);
      }
      appendBtn({
        label: String(p),
        ariaLabel: `Page ${p}`,
        onClick: p !== currentPage
          ? () => F.goToPage(p)
          : null,
        cls: p === currentPage
          ? CLS.pageActive
          : CLS.pageInactive
      });
      prev = p;
    });

    if (currentPage < totalPages) {
      appendBtn({
        label: "Next <i class=\"ri-arrow-right-line text-xl\"></i>",
        ariaLabel: "Next page",
        onClick: () => F.goToPage(currentPage + 1),
        cls: CLS.next
      });
    }
  };

  const render = () => {
    const filtered   = getFilteredCards();
    const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    const end   = start + CARDS_PER_PAGE;
    allCards.forEach((c) => {
      c.style.display = "none";
    });
    filtered.slice(start, end).forEach((c) => {
      c.style.display = "";
    });
    noResultsEl?.classList.toggle("hidden", filtered.length > 0);
    updateBadgeAndClear();
    renderPagination(totalPages);
  };

  F.onFilterChange = () => {
    currentPage = 1;
    render();
  };

  F.goToPage = (page) => {
    currentPage = page;
    render();
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buildCheckboxes = (container, values, activeMap) => {
    if (!container) {
      return;
    }
    container.innerHTML = "";
    values.forEach((v) => {
      const label = document.createElement("label");
      label.className = CLS.checkLabel;
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = v;
      cb.checked = Boolean(activeMap[v]);
      cb.className = CLS.checkbox;
      cb.addEventListener("change", () => {
        if (cb.checked) {
          activeMap[v] = true;
        } else {
          Reflect.deleteProperty(activeMap, v);
        }
        F.onFilterChange();
      });
      label.append(cb, document.createTextNode(v));
      container.appendChild(label);
    });
  };

  buildCheckboxes(typeContainer,     uniqueSorted("type"),    activeTypes);
  buildCheckboxes(countryContainer,  uniqueSorted("country"), activeCountries);

  filterToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    setPanel(!panelOpen);
  });

  document.addEventListener("click", (e) => {
    if (panelOpen && !$("[data-cs-filter-dropdown]")?.contains(e.target)) {
      setPanel(false);
    }
  });

  clearBtn?.addEventListener("click", () => {
    clearMap(activeTypes);
    clearMap(activeCountries);
    if (searchInput) {
      searchInput.value = "";
    }
    [typeContainer, countryContainer].forEach((c) => {
      c?.querySelectorAll("input").forEach((cb) => {
        cb.checked = false;
      });
    });
    F.onFilterChange();
  });

  searchInput?.addEventListener("input", F.onFilterChange);
  render();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", caseStudyFilter);
} else {
  caseStudyFilter();
}
