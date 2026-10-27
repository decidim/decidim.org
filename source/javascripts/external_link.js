/**
 * Checks whether a given href resolves to a different host than the current page.
 * @param {string} href - The href attribute value to check.
 * @returns {boolean} Whether the href points to an external host.
 */

const isExternalHref = function (href) {
  try {
    const url = new URL(href, location.href);
    return (/^https?:$/).test(url.protocol) && url.host !== location.host;
  } catch {
    return false;
  }
};

const externalLink = function () {
  document.querySelectorAll("a").forEach((node) => {
    if (node.dataset.externalLink === "false") {
      return;
    }
    const href = node.getAttribute("href") || "";
    const external = (/^\/link\?external_url=/).test(href) || isExternalHref(href);
    if (external) {
      node.setAttribute("target", "_blank");
    }
  });
};

externalLink();
