# frozen_string_literal: true

require "spec_helper"

RSpec.describe "alert banner", type: :feature do
  before do
    allow_any_instance_of(PageHelpers).to receive(:alert_enabled?).and_return(enabled)
    visit route
  end

  context "when is disabled" do
    let(:enabled) { false }

    context "and it's on the homepage" do
      let(:route) { "/" }

      it "doesn't show the banner" do
        expect(page).not_to have_content(I18n.t("alert.strong"))
        expect(page).not_to have_content(I18n.t("alert.p1"))
      end
    end

    context "and it's on another page" do
      let(:route) { "/about" }

      it "doesn't show the banner" do
        expect(page).not_to have_content(I18n.t("alert.strong"))
        expect(page).not_to have_content(I18n.t("alert.p1"))
      end
    end
  end

  context "when is enabled" do
    let(:enabled) { true }

    context "and it's on the homepage" do
      let(:route) { "/" }

      it "shows the banner" do
        expect(page).to have_content(I18n.t("alert.strong"))
        expect(page).to have_content(I18n.t("alert.p1"))
      end
    end

    context "and it's on another page" do
      let(:route) { "/about" }

      it "shows the banner" do
        expect(page).to have_content(I18n.t("alert.strong"))
        expect(page).to have_content(I18n.t("alert.p1"))
      end
    end
  end
end
