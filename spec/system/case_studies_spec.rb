# frozen_string_literal: true

require "spec_helper"

RSpec.describe "case studies", type: :feature do
  before do
    visit "/case-studies"
  end

  it "has the correct title header" do
    expect(page).to have_text "Case Studies"
  end

  it "loads without 500 error" do
    expect(page.status_code).to eq(200)
  end

  it "filters cards when a type filter is selected", :js do
    find("[data-filter-toggle]").click
    check "Participatory Budgeting"

    expect(page).to have_css("[data-filter-card][data-type*='Participatory Budgeting']", count: 2)
  end

  it "removes a filter when the chip close button is clicked", :js do
    find("[data-filter-toggle]").click
    check "Finland"
    find("[data-filter-chips] button[aria-label='Remove Finland']").click

    expect(page).to have_css("[data-filter-card][data-type='Strategic Planning']", visible: :visible)
  end

  it "filters cards when typing in the search box", :js do
    fill_in "Search...", with: "Helsinki"

    expect(page).to have_css("[data-filter-card]", count: 1, text: "Helsinki")
  end
end
