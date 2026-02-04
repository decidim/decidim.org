# frozen_string_literal: true

module MapHelpers
  # Parse installations data and extract those with valid geolocation
  # Returns an array of installation objects with parsed coordinates
  #
  # @param installations [Hash] Hash of installation data from Middleman
  # @return [Array<Hash>] Array of installation objects with id, title, url, type, lat, lng, image
  def parse_map_installations(installations)
    map_installations = []

    installations.each do |id, installation|
      next unless installation.location.present?

      begin
        geo = JSON.parse(installation.location)
        next unless geo["type"] == "Point" && geo["coordinates"].is_a?(Array) && geo["coordinates"].length == 2

        map_installations << {
          id:,
          title: installation.title,
          url: installation.url,
          type: installation.type,
          lat: geo["coordinates"][1],
          lng: geo["coordinates"][0],
          image: installation.image
        }
      rescue JSON::ParserError
        # Skip invalid JSON
        next
      end
    end

    map_installations
  end
end
