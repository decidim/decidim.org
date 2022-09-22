# frozen_string_literal: true

require "i18n_helpers"

RSpec.describe I18nHelpers do
  include I18nHelpers

  before do
    allow(I18n).to receive(:locale).and_return(locale)
  end

  describe "#root_for_locale" do
    let(:subject) { root_for_locale(locale) }

    context "English locale" do
      let(:locale) { :en }

      it { is_expected.to eq("/") }
    end

    context "Another locale" do
      let(:locale) { :ca }

      it { is_expected.to eq("/ca/") }
    end
  end

  describe "#current_path_for_locale" do
    let(:subject) { current_path_for_locale(locale, current_path) }

    context "English locale" do
      let(:locale) { :en }

      context "Homepage" do
        let(:current_path) { "/" }

        it { is_expected.to eq("/") }
      end

      context "About" do
        let(:current_path) { "/about" }

        it { is_expected.to eq("/about") }
      end
    end

    context "Another locale" do
      let(:locale) { :ca }

      context "Homepage" do
        let(:current_path) { "/" }

        it { is_expected.to eq("/ca/") }
      end

      context "About" do
        let(:current_path) { "/about" }

        it { is_expected.to eq("/ca/about") }
      end
    end
  end
end
