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

  it "links to the case studies page" do
    expect(page).to have_link(href: %r{/case-studies})
  end

  context "when displaying installations" do
    let(:expected_installations) do
      [
        "Assemblée Nationale",
        "Barcelona",
        "Brasil Participativo",
        "Ciudad de Mexico",
        "European Commission -  Citizens' Engagement Platform",
        "Generalitat de Catalunya",
        "Helsinki",
        "Kakogawa",
        "NYC",
        "République et Canton de Genève"
      ]
    end

    it "shows the main installations" do
      rendered = page.all(".grid img").map { |img| img["alt"] }

      expect(rendered).to match_array(expected_installations)
    end
  end
end
