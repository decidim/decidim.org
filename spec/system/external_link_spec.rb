# frozen_string_literal: true

require "spec_helper"

RSpec.describe "external links", :js, type: :feature do
  let(:source) { File.read(File.expand_path("../../source/javascripts/external_link.js", __dir__)) }

  before do
    visit "/"
  end

  def render_links(html)
    page.execute_script("document.body.innerHTML = #{html.to_json}")
    page.execute_script("(function() { #{source} })()")
  end

  def expect_new_tab(selector)
    expect(page).to have_css("#{selector}[target='_blank']")
  end

  def expect_same_tab(selector)
    expect(page).to have_no_css("#{selector}[target]")
  end

  def expect_unchanged_target(selector)
    expect(page).to have_css("#{selector}[target='_blank']")
  end

  it "is loaded by the layout" do
    expect(page).to have_css("script[src*='external_link']", visible: :all)
  end

  it "opens an external link on the community page in a new tab" do
    visit "/community"

    expect(page).to have_css("a[href='https://meta.decidim.org/'][target='_blank']")
  end

  it "opens absolute external links in a new tab" do
    render_links('<a id="link" href="https://example.com/page">external</a>')

    expect_new_tab("#link")
  end

  it "opens protocol-relative external links in a new tab" do
    render_links('<a id="link" href="//example.com/page">external</a>')

    expect_new_tab("#link")
  end

  it "opens external redirect links in a new tab" do
    render_links('<a id="link" href="/link?external_url=https%3A%2F%2Fexample.com">external</a>')

    expect_new_tab("#link")
  end

  it "leaves relative links alone" do
    render_links('<a id="link" href="/about">internal</a>')

    expect_same_tab("#link")
  end

  it "leaves same-host links alone" do
    render_links(%(<a id="link" href="#{page.evaluate_script("location.origin")}/about">internal</a>))

    expect_same_tab("#link")
  end

  it "leaves the target of internal links alone" do
    render_links('<a id="link" href="/about" target="_blank">internal</a>')

    expect_unchanged_target("#link")
  end

  it "leaves non-http links alone" do
    render_links('<a id="link" href="mailto:hello@example.com">email</a>')

    expect_same_tab("#link")
  end

  it "leaves malformed links alone" do
    render_links('<a id="link" href="http://[">broken</a>')

    expect_same_tab("#link")
  end

  it "leaves links with data-external-link=false alone" do
    render_links('<a id="link" href="https://example.com" data-external-link="false">external</a>')

    expect_same_tab("#link")
  end

  it "leaves the target of links with data-external-link=false alone" do
    render_links('<a id="link" href="https://example.com" target="_blank" data-external-link="false">external</a>')

    expect_unchanged_target("#link")
  end

  it "opens lookalike hosts in a new tab" do
    target = page.evaluate_script(<<~JS)
      (function() {
        const location = new URL("https://decidim.org/");
        const document = window.document.createElement("div");
        document.innerHTML = '<a href="https://decidim.org.evil.example/">external</a>';
        #{source}
        return document.querySelector("a").getAttribute("target");
      })()
    JS

    expect(target).to eq("_blank")
  end
end
