# frozen_string_literal: true

require "spec_helper"
RSpec.describe "documentation", type: :feature do
  before do
    visit "/documentation"
  end

  it "has the correct title header" do
    expect(page).to have_text "Documentation"
  end

  it "has a link to the API documentation page" do
    expect(page).to have_link "Documentation", href: "https://docs.decidim.org"
  end

  it "loads without 500 error" do
    expect(page.status_code).to eq(200)
  end
end
