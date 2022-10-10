# frozen_string_literal: true

require "spec_helper"

RSpec.describe "language selector", type: :feature do
  before do
    visit "/ca"
  end

  it "has the correct title header" do
    expect(page).to have_selector "h1"
    within "h1" do
      expect(page).to have_content "Decidim és una plataforma digitalde participació ciutadana"
    end
  end

  it "changes the locale" do
    expect(page).to have_selector "nav details"

    within "nav details" do
      expect(page).to have_text "Castellano"
      expect(page).to have_text "Català"
      expect(page).to have_text "English"
      expect(page).to have_text "Français"
    end

    within "nav details" do
      click_link "English", visible: false
    end

    expect(page).to have_content "Decidim is a digital platform for citizen participation"
  end
end
