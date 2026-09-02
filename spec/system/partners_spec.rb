# frozen_string_literal: true

RSpec.describe "partners", type: :feature do
  before do
    visit "/partners"
  end

  it "has the correct title header" do
    expect(page).to have_text "Partners"
  end

  it "loads without 500 error" do
    expect(page.status_code).to eq(200)
  end

  it "filters cards when a region filter is selected", :js do
    find("[data-filter-toggle]").click
    check "Japan"

    expect(page).to have_css("[data-filter-card][data-region='Japan']", count: 1)
  end

  it "removes a filter when the chip close button is clicked", :js do
    find("[data-filter-toggle]").click
    check "Japan"
    find("[data-filter-chips] button[aria-label='Remove Japan']").click

    expect(page).to have_css("[data-filter-card][data-region='Catalonia']", visible: :visible)
  end

  it "filters cards when typing in the search box", :js do
    fill_in "Search...", with: "Octree"

    expect(page).to have_css("[data-filter-card]", count: 1, text: "Octree")
  end
end
