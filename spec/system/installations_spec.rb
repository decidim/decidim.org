# frozen_string_literal: true

require "spec_helper"

RSpec.describe "installations", type: :feature do
  before do
    visit "/installations"
  end

  it "has the correct h1 element" do
    expect(page).to have_css "h1"
  end

  it "displays the correct title header content" do
    within "h1" do
      expect(page).to have_content(/Who uses Decidim/i)
    end
  end

  it "loads with a happy path" do
    expect(page.status_code).to eq(200)
  end

  it "displays the highlighted facts" do
    expect(page).to have_css("[data-fact-counter]", count: 3)
  end

  context "when accessing the CSV installation download file" do
    it "has a download csv link" do
      expect(page).to have_link(href: "/uploads/installations.csv")
    end

    it "downloads a csv file when clicking the link" do
      click_link(href: "/uploads/installations.csv")

      expect(page.response_headers["Content-Type"]).to include("text/csv")
    end

    it "csv file contains correct headers and data" do
      csv_content = File.read(File.join(__dir__, "../../source/uploads/installations.csv"))

      expect(csv_content).to include('"title","url","image","type","priority","home"')
    end
  end

  context "when JavaScript is enabled", :js do
    before do
      page.current_window.resize_to(390, 500)
      visit "/installations"
      wait_for_facts_script
    end

    it "counts up to the final values only once", :aggregate_failures do
      expected = fact_targets

      track_fact_counter_changes
      scroll_to_facts
      wait_for_final_fact_values

      expect(fact_values).to eq(expected)
      expect(page.evaluate_script("window.factCounterChanges")).to be_positive

      page.execute_script("window.scrollTo(0, 0)")
      scroll_to_facts
      page.driver.browser.execute_async_script("setTimeout(arguments[0], 150)")

      expect(fact_values).to eq(expected)
    end
  end

  context "when reduced motion is enabled", :js do
    before do
      emulate_reduced_motion
      page.current_window.resize_to(390, 500)
      visit "/installations"
      wait_for_facts_script
    end

    after do
      page.driver.browser.execute_cdp("Emulation.setEmulatedMedia", features: [])
    end

    it "shows the final values without counting", :aggregate_failures do
      reduced_motion = page.evaluate_script(
        "window.matchMedia('(prefers-reduced-motion: reduce)').matches"
      )
      expect(reduced_motion).to be true
      expected = fact_targets

      scroll_to_facts
      page.driver.browser.execute_async_script("setTimeout(arguments[0], 150)")

      expect(fact_values).to eq(expected)
    end
  end

  private

  def emulate_reduced_motion
    page.driver.browser.execute_cdp(
      "Emulation.setEmulatedMedia",
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    )
  end

  def fact_targets
    page.all("[data-fact-counter]").map { |counter| counter["data-fact-value"] }
  end

  def fact_values
    page.all("[data-fact-counter]").map(&:text)
  end

  def scroll_to_facts
    page.execute_script(
      "document.querySelector('[data-fact-counter]').scrollIntoView({ block: 'center' })"
    )
  end

  def track_fact_counter_changes
    page.execute_script(<<~JS)
      window.factCounterChanges = 0;
      const counter = document.querySelector("[data-fact-counter]");
      new MutationObserver(() => {
        if (counter.textContent.trim() !== counter.dataset.factValue) {
          window.factCounterChanges += 1;
        }
      }).observe(counter, { childList: true, characterData: true, subtree: true });
    JS
  end

  def wait_for_facts_script
    page.driver.browser.execute_async_script(<<~JS)
      const done = arguments[0];
      const check = () => {
        if (typeof factsCounter === "function") {
          done();
        } else {
          setTimeout(check, 25);
        }
      };
      check();
    JS
  end

  def wait_for_final_fact_values
    fact_targets.each do |target|
      expect(page).to have_css(
        "[data-fact-counter][data-fact-value='#{target}']",
        text: target
      )
    end
  end
end
