# frozen_string_literal: true

# Helper module for map-related functionality
# Provides methods to parse and filter installation data for map display
module MapHelpers
  # Parse installations data and extract those with valid geolocation
  # Returns an array of installation objects with parsed coordinates
  #
  # @param installations [Hash] Hash of installation data from Middleman
  # @return [Array<Hash>] Array of installation objects with id, title, url, type, lat, lng, image
  def parse_map_installations(installations)
    installations.filter_map { |id, installation| parse_installation(id, installation) }
  end

  private

  # Parse a single installation and return map data if valid
  #
  # @param id [Symbol] Installation identifier
  # @param installation [Object] Installation data object
  # @return [Hash, nil] Map data hash or nil if invalid
  def parse_installation(id, installation)
    return nil unless installation.location.present?

    geo = parse_geojson(installation.location)
    return nil unless valid_point?(geo)

    build_map_data(id, installation, geo)
  rescue JSON::ParserError
    nil
  end

  # Parse location string as GeoJSON
  #
  # @param location [String] JSON string containing GeoJSON data
  # @return [Hash] Parsed GeoJSON hash
  def parse_geojson(location)
    JSON.parse(location)
  end

  # Check if geo data is a valid Point with coordinates
  #
  # @param geo [Hash] Parsed GeoJSON hash
  # @return [Boolean] true if valid Point geometry
  def valid_point?(geo)
    geo["type"] == "Point" &&
      geo["coordinates"].is_a?(Array) &&
      geo["coordinates"].length == 2
  end

  # Build map data hash from installation and geo data
  #
  # @param id [Symbol] Installation identifier
  # @param installation [Object] Installation data object
  # @param geo [Hash] Parsed GeoJSON hash
  # @return [Hash] Map data hash
  def build_map_data(id, installation, geo)
    {
      id:,
      title: installation.title,
      url: installation.url,
      type: installation.type,
      lat: geo["coordinates"][1],
      lng: geo["coordinates"][0],
      image: installation.image
    }
  end
end
