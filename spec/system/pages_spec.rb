# frozen_string_literal: true

require "spec_helper"

RSpec.describe "pages", type: :feature do
  before do
    visit "/trademark-policy"
  end

  it "has the correct h1 element" do
    expect(page).to have_css "h1"
  end

  it "displays the correct title header content" do
    within "h1" do
      expect(page).to have_content(/Trademark policy/i)
    end
  end

  it "has a main element" do
    expect(page).to have_css "main"
  end

  it "has a link to Ruby on Rails" do
    within "main" do
      expect(page).to have_link "Ruby on Rails", href: "https://rubyonrails.org/trademarks"
    end
  end

  it "has a link to Wordpress Foundation" do
    within "main" do
      expect(page).to have_link "Wordpress Foundation", href: "https://wordpressfoundation.org/trademark-policy/"
    end
  end
end
