# frozen_string_literal: true

require "page_helpers"

RSpec.describe PageHelpers do
  include PageHelpers

  let(:locales) { [:en, :ca] }

  before do
    allow(I18n).to receive(:available_locales).and_return(locales)
  end

  describe "#homepage?" do
    let(:subject) { homepage?(current_page) }

    context "on Homepage" do
      context "English locale" do
        let(:current_page) { "/" }

        it { is_expected.to be_truthy }
      end

      context "Another locale" do
        let(:current_page) { "/ca/" }

        it { is_expected.to be_truthy }
      end
    end

    context "on another page" do
      context "English locale" do
        let(:current_page) { "/about" }

        it { is_expected.to be_falsy }
      end

      context "Another locale" do
        let(:current_page) { "/ca/about" }

        it { is_expected.to be_falsy }
      end
    end
  end
end
