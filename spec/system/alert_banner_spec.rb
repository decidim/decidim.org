# frozen_string_literal: true

require "spec_helper"

RSpec.describe "alert banner", type: :feature do
  before do
    # rubocop:disable RSpec/AnyInstance
    allow_any_instance_of(PageHelpers).to receive(:alert_enabled?).and_return(enabled)
    # rubocop:enable RSpec/AnyInstance
    visit route
  end

  context "when is disabled" do
    let(:enabled) { false }

    context "and it's on the homepage" do
      let(:route) { "/" }

      it "doesn't show the alert strong message" do
        expect(page).to have_no_content(I18n.t("alert.strong"))
      end

      it "doesn't show the alert p1 message" do
        expect(page).to have_no_content(I18n.t("alert.p1"))
      end
    end

    context "and it's on another page" do
      let(:route) { "/about" }

      it "doesn't show the alert strong message" do
        expect(page).to have_no_content(I18n.t("alert.strong"))
      end

      it "doesn't show the alert p1 message" do
        expect(page).to have_no_content(I18n.t("alert.p1"))
      end
    end
  end

  context "when is enabled" do
    let(:enabled) { true }

    context "and it's on the homepage" do
      let(:route) { "/" }

      it "shows the alert strong message" do
        expect(page).to have_content(I18n.t("alert.strong"))
      end

      it "shows the alert p1 message" do
        expect(page).to have_content(I18n.t("alert.p1"))
      end
    end

    context "and it's on another page" do
      let(:route) { "/about" }

      it "shows the alert strong message" do
        expect(page).to have_content(I18n.t("alert.strong"))
      end

      it "shows the alert p1 message" do
        expect(page).to have_content(I18n.t("alert.p1"))
      end
    end
  end
end
