# frozen_string_literal: true

require "map_helpers"

# Create a struct to simulate Middleman's EnhancedHash behavior
Installation = Struct.new(:title, :url, :type, :location, :image, keyword_init: true)

RSpec.describe MapHelpers do
  include described_class

  describe "#parse_map_installations" do
    subject(:result) { parse_map_installations(installations) }

    context "when there are no installations" do
      let(:installations) { {} }

      it "returns an empty array" do
        expect(result).to eq([])
      end
    end

    context "when installations have valid GeoJSON location data" do
      let(:installations) do
        {
          barcelona: Installation.new(
            title: "Barcelona",
            url: "https://www.decidim.barcelona/",
            type: "city",
            location: '{"type":"Point","coordinates":[2.183,41.383]}',
            image: "/uploads/logo_aj_barcelona.svg"
          ),
          metadecidim: Installation.new(
            title: "Metadecidim",
            url: "https://meta.decidim.org/",
            type: "org",
            location: '{"type":"Point","coordinates":[2.1734,41.3851]}',
            image: "/uploads/logo_metadecidim.png"
          )
        }
      end

      it "returns installations with parsed coordinates", :aggregate_failures do
        expect(result.length).to eq(2)

        barcelona = result.find { |i| i[:id] == :barcelona }
        expect(barcelona).to include(
          title: "Barcelona",
          url: "https://www.decidim.barcelona/",
          type: "city",
          lat: 41.383,
          lng: 2.183,
          image: "/uploads/logo_aj_barcelona.svg"
        )

        metadecidim = result.find { |i| i[:id] == :metadecidim }
        expect(metadecidim).to include(
          title: "Metadecidim",
          url: "https://meta.decidim.org/",
          type: "org",
          lat: 41.3851,
          lng: 2.1734,
          image: "/uploads/logo_metadecidim.png"
        )
      end
    end

    context "when installation has no location data" do
      let(:installations) do
        {
          no_location: Installation.new(
            title: "No Location",
            url: "https://example.com/",
            type: "city",
            location: nil,
            image: "/uploads/logo.png"
          )
        }
      end

      it "excludes the installation from results" do
        expect(result).to eq([])
      end
    end

    context "when installation has invalid JSON in location" do
      let(:installations) do
        {
          invalid_json: Installation.new(
            title: "Invalid JSON",
            url: "https://example.com/",
            type: "city",
            location: "not valid json",
            image: "/uploads/logo.png"
          )
        }
      end

      it "skips the installation without raising an error", :aggregate_failures do
        expect { result }.not_to raise_error
        expect(result).to eq([])
      end
    end

    context "when installation has non-Point geometry type" do
      let(:installations) do
        {
          polygon: Installation.new(
            title: "Polygon",
            url: "https://example.com/",
            type: "region",
            location: '{"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}',
            image: "/uploads/logo.png"
          )
        }
      end

      it "excludes the installation from results" do
        expect(result).to eq([])
      end
    end

    context "when installation has missing coordinates" do
      let(:installations) do
        {
          no_coords: Installation.new(
            title: "No Coordinates",
            url: "https://example.com/",
            type: "city",
            location: '{"type":"Point"}',
            image: "/uploads/logo.png"
          )
        }
      end

      it "excludes the installation from results" do
        expect(result).to eq([])
      end
    end

    context "when installation has wrong coordinates format" do
      let(:installations) do
        {
          wrong_coords: Installation.new(
            title: "Wrong Coordinates",
            url: "https://example.com/",
            type: "city",
            location: '{"type":"Point","coordinates":[2.183]}',
            image: "/uploads/logo.png"
          )
        }
      end

      it "excludes the installation from results" do
        expect(result).to eq([])
      end
    end

    context "with mixed valid and invalid installations" do
      let(:installations) do
        {
          valid: Installation.new(
            title: "Valid",
            url: "https://valid.example.com/",
            type: "city",
            location: '{"type":"Point","coordinates":[2.183,41.383]}',
            image: "/uploads/valid.png"
          ),
          no_location: Installation.new(
            title: "No Location",
            url: "https://nolocation.example.com/",
            type: "org",
            location: nil,
            image: "/uploads/no_location.png"
          ),
          invalid_json: Installation.new(
            title: "Invalid JSON",
            url: "https://invalid.example.com/",
            type: "university",
            location: "invalid json here",
            image: "/uploads/invalid.png"
          ),
          another_valid: Installation.new(
            title: "Another Valid",
            url: "https://anothervalid.example.com/",
            type: "region",
            location: '{"type":"Point","coordinates":[-3.7038,40.4168]}',
            image: "/uploads/another_valid.png"
          )
        }
      end

      it "returns only the valid installations", :aggregate_failures do
        expect(result.length).to eq(2)

        valid = result.find { |i| i[:id] == :valid }
        expect(valid[:lat]).to eq(41.383)
        expect(valid[:lng]).to eq(2.183)

        another_valid = result.find { |i| i[:id] == :another_valid }
        expect(another_valid[:lat]).to eq(40.4168)
        expect(another_valid[:lng]).to eq(-3.7038)
      end
    end
  end
end
