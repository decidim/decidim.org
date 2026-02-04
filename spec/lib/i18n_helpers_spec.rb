# frozen_string_literal: true

require "i18n_helpers"

RSpec.describe I18nHelpers do
  include described_class

  before do
    allow(I18n).to receive(:locale).and_return(locale)
  end

  describe "#root_for_locale" do
    subject { root_for_locale(locale) }

    context "with English locale" do
      let(:locale) { :en }

      it { is_expected.to eq("/") }
    end

    context "with Another locale" do
      let(:locale) { :ca }

      it { is_expected.to eq("/ca/") }
    end
  end

  describe "#current_path_for_locale" do
    subject { current_path_for_locale(locale, current_path) }

    context "with English locale" do
      let(:locale) { :en }

      context "when it's on the Homepage" do
        let(:current_path) { "/" }

        it { is_expected.to eq("/") }
      end

      context "when it's on the About page" do
        let(:current_path) { "/about" }

        it { is_expected.to eq("/about") }
      end
    end

    context "with another locale" do
      let(:locale) { :ca }

      context "when it's on the Homepage" do
        let(:current_path) { "/" }

        it { is_expected.to eq("/ca/") }
      end

      context "when it's on the About page" do
        let(:current_path) { "/about" }

        it { is_expected.to eq("/ca/about") }
      end
    end
  end
end
