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
    within "nav details" do
      expect(page).to have_text "Castellano"
    end
  end

  it "displays Català in the language selector" do
    within "nav details" do
      expect(page).to have_text "Català"
    end
  end

  it "displays English in the language selector" do
    within "nav details" do
      expect(page).to have_text "English"
    end
  end

  it "displays Français in the language selector" do
    within "nav details" do
      expect(page).to have_text "Français"
    end
  end

  it "changes the locale to English when clicked" do
    within "nav details" do
      click_link "English", visible: false
    end

    expect(page).to have_content "Decidim is a digital platform for citizen participation"
  end
end
