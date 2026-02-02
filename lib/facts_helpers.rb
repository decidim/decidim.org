# frozen_string_literal: true

require "addressable/uri"

# Helper methods for gathering statistics about Decidim installations.
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
      data.installations.select { |_name, installation| installation["type"] == "org" }.count
    when "institutions"
      data.installations.select { |_name, installation| %w(region city).include? installation["type"] }.count
    when "countries"
      get_countries_from(data)
    else
      fallback
    end
  end

  private

  def get_countries_from(data)
    ctlds = extract_ctlds_from_installations(data.installations)
    count_valid_countries(ctlds, data.countries)
  end

  def extract_ctlds_from_installations(installations)
    installations
      .map { |_name, installation| extract_ctld_from_url(installation["url"]) }
      .uniq
  end

  def extract_ctld_from_url(url)
    clean_url = url.gsub(%r{https://web.archive.org/web/\d*/}, "")
    tld = Addressable::URI.parse(clean_url).tld
    tld.split(".")[-1] # Handle cases like "milano.it"
  end

  def count_valid_countries(ctlds, valid_countries)
    ctlds.count { |ctld| valid_countries.include?(ctld) }
  end
end
