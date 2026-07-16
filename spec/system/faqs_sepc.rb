# frozen_string_literal: true

require "spec_helper"

RSpec.describe "faqs", type: :feature do
  before do
    visit "/faqs"
  end

  it "has the correct title header" do
    expect(page).to have_text "FAQs"
  end

  it "loads without 500 error" do
    expect(page.status_code).to eq(200)
  end
end
