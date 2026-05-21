# frozen literal string: true

require "spec_helper"

RSpec.describe "book", type: :feature do
  before do
    visit "/book"
  end

  it "has the correct title header" do
    expect(page).to have_text "The Decidim Book"
  end

  it "has a PDF download link" do
    expect(page).to have_link("Download book PDF", href: "https://link.springer.com/content/pdf/10.1007/978-3-031-50784-7.pdf")
  end

  it "has an EPUB download link" do
    expect(page).to have_link("Download book EPUB", href: "https://link.springer.com/download/epub/10.1007/978-3-031-50784-7.epub")
  end
end
