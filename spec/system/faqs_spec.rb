# frozen_string_literal: true

require "spec_helper"

RSpec.describe "faqs", type: :feature do
  before do
    visit "/faqs"
  end

  it "has the correct title header" do
    expect(page).to have_text "FAQs"
  end

  it "loads without 500 error" do
    expect(page.status_code).to eq(200)
  end

  it "has a search input" do
    within("#faq-sections") do
      expect(page).to have_field("Search...")
    end
  end

  it "has FAQ sections as detail elements" do
    within("#faq-sections") do
      expect(page).to have_css("details", minimum: 1)
    end
  end

  it "has the first detail section open by default" do
    within("#faq-sections") do
      first_detail = first("details")
      expect(first_detail["open"]).not_to be_nil
    end
  end

  it "has filterable items inside each detail section" do
    within("#faq-sections") do
      expect(page).to have_css("details [data-filter-target]", minimum: 1)
    end
  end

  it "has the data-filter attribute on the container for JS binding" do
    expect(page).to have_css("#faq-sections[data-filter]")
  end

  it "closes all details when search is cleared", :js do
    within("#faq-sections") do
      fill_in "Search...", with: "test"
      find(:css, "details[open]", match: :first)
      fill_in "Search...", with: ""
      expect(page).to have_no_css("details[open]")
    end
  end
end
