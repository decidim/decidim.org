# frozen_string_literal: true

module DataHelpers
  # Extract the data files that has a given key
  # Used for filtering the installations by type
  #
  # @param data [Array<String, Middleman::Util::EnhancedHash>] An array with the name of the installation and the data hash from Middleman
  # @param type [String] The type key to use in the selection
  # @return [Array<String, Middleman::Util::EnhancedHash>]
  def data_select_by_type(data, type)
    data.select { |_, m| m["type"] == type }
  end

  # Extract the data files that has the home=true key and value
  # Used for the installations in the homepage
  #
  # @param data [Middleman::Util::EnhancedHash] The data hash from Middleman
  # @return [Middleman::Util::EnhancedHash]
  def data_select_home(data)
    data.select { |_, m| m["home"] }
  end

  # Extract from the data files that has the footer=true key and value
  # Used for the social media links in the footer
  #
  # @param data [Hashie::Array] The data hash from Middleman
  # @return [Hashie::Array]
  def data_select_footer_social_media(hash)
    hash.select { |m| m["footer"] }
  end

  # Sort from the data files that has the numeric priority key
  #
  # @param data [Hash] A hash with the name of the data as key and the middleman data hash as value
  #                    examples: data.partners or data.installations
  # @option String [Middleman::Util::EnhancedHash]
  # @return [Hash]
  def data_sort_by(data, type)
    if type == "priority"
      data.sort_by { |_, m| m["priority"] }.reverse
    else
      data.sort_by { |_, m| m[type] }
    end
  end

  # Clean an HTML string from image tags
  # Used for the blog snippets or summaries in the homepage
  #
  # @param html [String] HTML with the string that needs to be cleaned up
  # @return [String]
  def strip_img(html)
    doc = Nokogiri::HTML(html)
    doc.search(".//img").remove
    doc.to_html
  end
end
