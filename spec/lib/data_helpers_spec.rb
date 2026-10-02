# frozen_string_literal: true

require "date"
require "data_helpers"

RSpec.describe DataHelpers do
  include described_class

  describe "#data_sort_media_by_date" do
    subject(:sorted) { data_sort_media_by_date(media) }

    let(:media) do
      {
        "older" => { "date" => Date.new(2020, 3, 4) },
        "newest" => { "date" => Date.new(2026, 1, 15) }
      }
    end

    it "sorts newest media first and oldest last" do
      expect(sorted.map(&:first)).to eq %w(newest older)
    end
  end
end
