# frozen_string_literal: true

require "spec_helper"

RSpec.describe "blog feed", type: :feature do
  before do
    visit "/blog/feed.xml"
  end

  it "returns an Atom feed" do
    expect(page).to have_css "feed"
  end

  it "uses the correct Atom namespace" do
    expect(page).to have_css 'feed[xmlns="http://www.w3.org/2005/Atom"]'
  end

  it "has the correct title" do
    within "feed > title" do
      expect(page).to have_text "Decidim Blog"
    end
  end

  it "has a subtitle" do
    within "feed > subtitle" do
      expect(page).to have_text "Release notes, press releases and news about the Decidim project"
    end
  end

  it "has an author" do
    within "feed > author > name" do
      expect(page).to have_text "Decidim Team"
    end
  end

  it "has entries" do
    expect(page).to have_css "feed > entry"
  end

  it "each entry has a title" do
    all("feed > entry").each do |entry|
      within entry do
        expect(page).to have_css "title"
      end
    end
  end

  it "each entry has a link" do
    all("feed > entry").each do |entry|
      within entry do
        expect(page).to have_css 'link[rel="alternate"]'
      end
    end
  end

  it "each entry has published date" do
    all("feed > entry").each do |entry|
      within entry do
        expect(page).to have_css "published"
      end
    end
  end
end
