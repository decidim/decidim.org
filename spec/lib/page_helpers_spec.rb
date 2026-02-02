# frozen_string_literal: true

require "page_helpers"

RSpec.describe PageHelpers do
  include described_class

  let(:locales) { [:en, :ca] }

  before do
    allow(I18n).to receive(:available_locales).and_return(locales)
  end

  describe "#homepage?" do
    subject { homepage?(current_page) }

    context "when it's on Homepage" do
      context "with English locale" do
        let(:current_page) { "/" }

        it { is_expected.to be_truthy }
      end

      context "with another locale" do
        let(:current_page) { "/ca/" }

        it { is_expected.to be_truthy }
      end
    end

    context "when it's on another page" do
      context "with English locale" do
        let(:current_page) { "/about" }

        it { is_expected.to be_falsy }
      end

      context "with Another locale" do
        let(:current_page) { "/ca/about" }

        it { is_expected.to be_falsy }
      end
    end
  end
end
