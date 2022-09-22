# frozen_string_literal: true

require "spec_helper"

RSpec.describe "index", type: :feature do
  before do
    visit "/tags/releases"
  end

  it "has the correct title header" do
    expect(page).to have_text "Articles tagged with releases"
  end
end
