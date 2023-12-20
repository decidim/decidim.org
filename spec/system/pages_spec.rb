# frozen_string_literal: true

require "spec_helper"

RSpec.describe "pages", type: :feature do
  before do
    visit "/trademark-policy"
  end

  it "has the correct title header" do
    expect(page).to have_css "h1"
    within "h1" do
      expect(page).to have_content(/Trademark policy/i)
    end
  end

  it "has the correct links" do
    expect(page).to have_css "main"

    within "main" do
      expect(page).to have_link "Ruby on Rails", href: "https://rubyonrails.org/trademarks"
      expect(page).to have_link "Wordpress Foundation", href: "https://wordpressfoundation.org/trademark-policy/"
    end
  end
end
