# frozen_string_literal: true

require "spec_helper"

RSpec.describe "used by", type: :feature do
  before do
    visit "/usedby"
  end

  it "has the correct h1 element" do
    expect(page).to have_css "h1"
  end

  it "displays the correct title header content" do
    within "h1" do
      expect(page).to have_content(/Decidim in use/i)
    end
  end
end
