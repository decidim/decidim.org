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
end
