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
end
