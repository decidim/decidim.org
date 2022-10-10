# frozen_string_literal: true

require "spec_helper"

RSpec.describe "index", type: :feature do
  before do
    visit "/"
  end

  it "has the correct title header" do
    expect(page).to have_selector "h1"
    within "h1" do
      expect(page).to have_content(/Decidim is a digital platform for citizen participation/i)
    end
  end

  it "has a navigation with the languages" do
    expect(page).to have_selector "nav details"

    within "nav details" do
      expect(page).to have_text "Castellano"
      expect(page).to have_text "Català"
      expect(page).to have_text "English"
      expect(page).to have_text "Français"
    end
  end
end
