# frozen_string_literal: true

RSpec.describe "blog", type: :feature do
  before do
    visit "/blog"
  end

  it "has the correct title header" do
    expect(page).to have_text "Blog"
  end

  it "loads without 500 error" do
    expect(page.status_code).to eq(200)
  end

  it "filters cards when a type filter is selected", :js do
    find("[data-cs-filter-toggle]").click
    check "Product"

    expect(page).to have_css("[data-cs-card][data-type='Product']", count: 1)
  end

  it "removes a filter when the chip close button is clicked", :js do
    find("[data-cs-filter-toggle]").click
    check "Product"
    find("[data-cs-active-chips] button[aria-label='Remove Product']").click

    expect(page).to have_no_css("[data-cs-active-chips]", text: "Product")
  end

  it "filters cards when typing in the search box", :js do
    fill_in "Search...", with: "Mozambique"

    expect(page).to have_css("[data-cs-card]", count: 1, text: "Mozambique")
  end

  it "provides no matchable cards when the search term does not match any blog post", :js do
    fill_in "Search...", with: "no results here today!"

    expect(page).to have_css("[data-cs-card]", count: 0)
  end

  it "provides a message when the search term does not match any blog post", :js do
    fill_in "Search...", with: "no results here today!"

    expect(page).to have_text("No case studies found matching your filters.")
  end

  it "allows the clearing of filters within the filter panel", :js do
    find("[data-cs-filter-toggle]").click
    check "Announcements"

    find("[data-cs-clear-filters]").click
    expect(page).to have_unchecked_field("Announcements")
  end
end
