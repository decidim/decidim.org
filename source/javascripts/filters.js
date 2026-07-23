/**
 * Handles search, type filters, pagination, and active filter pills under the search.
 * Initializes on DOM ready or immediately if document is already loaded.
 *
 * @example
 * <input type="text" data-cs-search placeholder="Search..." />
 *
 * <button data-cs-filter-toggle>
 *   Filters
 *   <span data-cs-filter-badge class="hidden">0</span>
 *   <i data-cs-filter-arrow></i>
 * </button>
 *
 * <div data-cs-filter-dropdown>
 *   <div data-cs-filter-panel class="hidden">
 * <div data-cs-type-checkboxes></div>
 *     <div data-cs-region-checkboxes></div>
 *     <button data-cs-clear-filters class="hidden">Clear filters</button>
 *   </div>
 * </div>
 *
 * <div data-cs-active-chips></div>
 *
 * <div data-cs-grid>
 *   <div data-cs-card data-type="Case Study" data-region="Spain">...</div>
 *   <div data-cs-card data-type="White Paper" data-region="France">...</div>
 * </div>
 *
 * <div data-cs-no-results class="hidden">No results found.</div>
 *
 * <div data-cs-pagination></div>
 */

/* eslint-disable max-lines */
const caseStudyFilter = () => {
  const CARDS_PER_PAGE = 6;
  const grid = document.querySelector("[data-cs-grid]");
  if (!grid) {
    return;
  }

  const searchInput      = document.querySelector("[data-cs-search]");
  const filterToggle     = document.querySelector("[data-cs-filter-toggle]");
  const filterPanel      = document.querySelector("[data-cs-filter-panel]");
  const filterArrow      = document.querySelector("[data-cs-filter-arrow]");
  const filterBadge      = document.querySelector("[data-cs-filter-badge]");
  const clearBtn         = document.querySelector("[data-cs-clear-filters]");
  const typeContainer    = document.querySelector("[data-cs-type-checkboxes]");
  const regionContainer  = document.querySelector("[data-cs-region-checkboxes]");
  const paginationEl     = document.querySelector("[data-cs-pagination]");
  const noResultsEl      = document.querySelector("[data-cs-no-results]");
  const chipsEl          = document.querySelector("[data-cs-active-chips]");
  const allCards         = Array.from(grid.querySelectorAll("[data-cs-card]"));

  let currentPage = 1;
  let panelOpen   = false;
  const activeTypes     = {};
  const activeRegions = {};

  const cssClasses = {
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

  const filter = {};

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
    const regionsActive = Object.keys(activeRegions).length > 0;
    return allCards.filter((c) => {
      if (typesActive && !activeTypes[c.dataset.type]) {
        return false;
      }
      if (regionsActive && !activeRegions[c.dataset.region]) {
        return false;
      }
      if (search && !c.textContent.toLowerCase().includes(search)) {
        return false;
      }
      return true;
    });
  };

  const updateBadgeAndClear = () => {
    const count = Object.keys(activeTypes).length + Object.keys(activeRegions).length;
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
      chip.className   = cssClasses.chip;
      chip.textContent = val;
      const x = document.createElement("button");
      x.innerHTML = "&times;";
      x.setAttribute("aria-label", `Remove ${val}`);
      x.className = cssClasses.chipX;
      x.addEventListener("click", () => {
        Reflect.deleteProperty(map, val);
        container?.querySelectorAll("input").forEach((cb) => {
          if (cb.value === val) {
            cb.checked = false;
          }
        });
        filter.onFilterChange();
      });
      chip.appendChild(x);
      chipsEl.appendChild(chip);
    };
    Object.keys(activeTypes).forEach((v) => addChip(v, activeTypes, typeContainer));
    Object.keys(activeRegions).forEach((v) => addChip(v, activeRegions, regionContainer));
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
      const button = document.createElement("button");
      button.innerHTML = label;
      button.setAttribute("aria-label", ariaLabel);
      button.className = cls;
      if (onClick) {
        button.addEventListener("click", onClick);
      } else {
        button.disabled = true;
      }
      paginationEl.appendChild(button);
    };

    if (currentPage > 1) {
      appendBtn({
        label: "<svg class=\"w-5 h-5\" fill=\"currentColor\"><use xlink:href=\"/images/remixicon.symbol.svg#ri-arrow-left-line\"></use></svg> Prev",
        ariaLabel: "Previous page",
        onClick: () => filter.goToPage(currentPage - 1),
        cls: cssClasses.prev
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
        el.className = cssClasses.ellipsis;
        paginationEl.appendChild(el);
      }
      appendBtn({
        label: String(p),
        ariaLabel: `Page ${p}`,
        onClick: p !== currentPage
          ? () => filter.goToPage(p)
          : null,
        cls: p === currentPage
          ? cssClasses.pageActive
          : cssClasses.pageInactive
      });
      prev = p;
    });

    if (currentPage < totalPages) {
      appendBtn({
        label: "Next <svg class=\"w-5 h-5\" fill=\"currentColor\"><use xlink:href=\"/images/remixicon.symbol.svg#ri-arrow-right-line\"></use></svg",
        ariaLabel: "Next page",
        onClick: () => filter.goToPage(currentPage + 1),
        cls: cssClasses.next
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

  filter.onFilterChange = () => {
    currentPage = 1;
    render();
  };

  filter.goToPage = (page) => {
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
      label.className = cssClasses.checkLabel;
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.value = v;
      checkBox.checked = Boolean(activeMap[v]);
      checkBox.className = cssClasses.checkbox;
      checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
          activeMap[v] = true;
        } else {
          Reflect.deleteProperty(activeMap, v);
        }
        filter.onFilterChange();
      });
      label.append(checkBox, document.createTextNode(v));
      container.appendChild(label);
    });
  };

  buildCheckboxes(typeContainer,    uniqueSorted("type"),    activeTypes);
  buildCheckboxes(regionContainer, uniqueSorted("region"), activeRegions);

  filterToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    setPanel(!panelOpen);
  });

  document.addEventListener("click", (e) => {
    if (panelOpen && !document.querySelector("[data-cs-filter-dropdown]")?.contains(e.target)) {
      setPanel(false);
    }
  });

  clearBtn?.addEventListener("click", () => {
    clearMap(activeTypes);
    clearMap(activeRegions);
    if (searchInput) {
      searchInput.value = "";
    }
    [typeContainer, regionContainer].forEach((c) => {
      c?.querySelectorAll("input").forEach((cb) => {
        cb.checked = false;
      });
    });
    filter.onFilterChange();
  });

  searchInput?.addEventListener("input", filter.onFilterChange);
  render();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", caseStudyFilter);
} else {
  caseStudyFilter();
}
