# frozen_string_literal: true

require "facts_helpers"

RSpec.describe FactsHelpers do
  include described_class

  describe "#get_statistic_for_fact" do
    subject(:statistic) { get_statistic_for_fact(data_type, fallback, data) }

    let(:fallback) { 123 }

    let(:data) do
      Struct.new(:installations, :countries, keyword_init: true).new(
        installations: [
          [:installation1, { "id" => "i1", "type" => "org", "url" => "https://example.org" }],
          [:installation2, { "id" => "i2", "type" => "city", "url" => "https://example.es" }],
          [:installation3, { "id" => "i3", "type" => "city", "url" => "https://example.cat" }],
          [:installation4, { "id" => "i4", "type" => "region", "url" => "https://example.fr" }]
        ],
        countries: %w(es fr)
      )
    end

    describe "data type" do
      context "when it does not exist" do
        let(:data_type) { "fallback" }

        it "returns the fallback" do
          expect(statistic).to eq 123
        end
      end

      context "when it is 'instances'" do
        let(:data_type) { "instances" }

        it "returns the count of instances" do
          expect(statistic).to eq 4
        end
      end

      context "when it is 'organizations'" do
        let(:data_type) { "organizations" }

        it "returns the count of organizations" do
          expect(statistic).to eq 1
        end
      end

      context "when it is 'institutions'" do
        let(:data_type) { "institutions" }

        it "returns the count of institutions" do
          expect(statistic).to eq 3
        end
      end

      context "when it is 'countries'" do
        let(:data_type) { "countries" }

        it "returns the count of instances" do
          expect(statistic).to eq 2
        end
      end
    end
  end
end
