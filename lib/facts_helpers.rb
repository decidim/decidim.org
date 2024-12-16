# frozen_string_literal: true

require "addressable/uri"

module FactsHelpers
  # Get the statistic for this fact type
  # If the fact type is not supported, then return the hard-coded figure given as a parameter
  # 
  # @param data_type [String] - The name of the data type. For instance "instances"
  # @param fallback [Integer|String] - The number with the hard-coded value in case this type isn't supported
  # @param data [Middleman::CoreExtensions::Data::DataStore] - The data object from Middleman, to gather some of the information
  def get_statistic_for_fact(data_type, fallback, data)
    case data_type
    when "instances"
      data.installations.count
    when "organizations"
      data.installations.select {|name, installation| installation["type"] == "org" }.count
    when "institutions"
      data.installations.select {|name, installation| ["region", "city"].include? installation["type"] }.count
    when "countries"
      get_countries_from(data)
    else
      fallback
    end
  end

  private

  def get_countries_from(data)
    ctlds = data.installations
      .map {|name, installation| installation["url"] } 
      .map { |url| url.gsub(%r{https://web.archive.org/web/\d*/}, "") }
      .map { |url| Addressable::URI.parse(url).tld }
      .map { |url| url.split(".")[-1] } # Seems like we're getting some garbage, like "milano.it", so this worksaround it
      .uniq

    counter = 0
    ctlds.each do |ctld|
      counter+=1 if data.countries.include?(ctld)
    end

    counter
  end
end
