/**
 * Adds target="_blank" to every link pointing outside of decidim.org, excluding
 * anchors that opt out via the data-external-link="false" attribute.
 */

document.querySelectorAll("a").forEach((node) => {
  if (node.dataset.externalLink === "false") {
    return;
  }
  const href = node.getAttribute("href") || "";
  const external = (/^\/link\?external_url=/).test(href) || new RegExp(`^https?://((?!${location.host}).)+`).test(href);
  if (external) {
    node.setAttribute("target", "_blank");
  }
});
