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

  it "has a search input inside the filter container" do
    within("#faq-sections") do
      expect(page).to have_field("Search...")
    end
  end

  it "has FAQ sections as details elements" do
    within("#faq-sections") do
      expect(page).to have_css("details", minimum: 1)
    end
  end

  it "has the first details section open by default" do
    within("#faq-sections") do
      first_detail = first("details")
      expect(first_detail["open"]).not_to be_nil
    end
  end

  it "has filterable items inside each details section" do
    within("#faq-sections") do
      expect(page).to have_css("details [data-filter-target]", minimum: 1)
    end
  end

  it "has the data-filter attribute on the container for JS binding" do
    expect(page).to have_css("#faq-sections[data-filter]")
  end
end
