# frozen_string_literal: true

require "facts_helpers"

RSpec.describe FactsHelpers do
  include FactsHelpers

  describe "#get_statistic_for_fact" do
    subject { get_statistic_for_fact(data_type, fallback, data) }

    let(:fallback) { 123 }

    let(:data) do
      OpenStruct.new(
        installations: [
          ["i1", { "type" => "org",    "url" => "https://example.org" }],
          ["i2", { "type" => "city",   "url" => "https://example.es" }],
          ["i3", { "type" => "city",   "url" => "https://example.cat" }],
          ["i4", { "type" => "region", "url" => "https://example.fr" }]
        ],
        countries: ["es", "fr"])
    end

    describe "data type" do
      context "when it does not exist" do
        let(:data_type) { "fallback" }

        it "returns the fallback" do
          expect(subject).to eq 123
        end
      end

      context "when it is 'instances'" do
        let(:data_type) { "instances" }

        it "returns the count of instances" do
          expect(subject).to eq 4
        end
      end

      context "when it is 'organizations'" do
        let(:data_type) { "organizations" }

        it "returns the count of organizations" do
          expect(subject).to eq 1
        end
      end

      context "when it is 'institutions'" do
        let(:data_type) { "institutions" }

        it "returns the count of institutions" do
          expect(subject).to eq 3
        end
      end

      context "when it is 'countries'" do
        let(:data_type) { "countries" }

        it "returns the count of instances" do
          expect(subject).to eq 2
        end
      end
    end
  end
end
