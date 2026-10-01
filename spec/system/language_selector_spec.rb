# frozen_string_literal: true

require "spec_helper"

RSpec.describe "language selector", type: :feature do
  before do
    visit "/ca"
  end

  it "has the correct h1 element" do
    expect(page).to have_css "h1"
  end

  it "displays the correct title header content in Catalan" do
    within "h1" do
      expect(page).to have_content "Decidim és una plataforma digital de participació ciutadana"
    end
  end

  it "has a navigation with a details element" do
    expect(page).to have_css "nav details"
  end

  it "displays Castellano in the language selector" do
    expect(page).to have_css "details.no-animate", text: "Castellano"
  end

  it "displays Català in the language selector" do
    expect(page).to have_css "details.no-animate", text: "Català"
  end

  it "displays English in the language selector" do
    expect(page).to have_css "details.no-animate", text: "English"
  end

  it "displays Français in the language selector" do
    expect(page).to have_css "details.no-animate", text: "Français"
  end

  it "changes the locale to English when clicked" do
    within first("details.no-animate") do
      click_link "English", visible: false
    end

    expect(page).to have_content "Decidim is a digital platform for citizen participation"
  end
end
