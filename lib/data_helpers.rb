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

  def data_select_home(data)
    data.select { |_, m| m["home"] == true }
  end

  def data_sort_by_priority(data)
    data.sort_by { |_, m| m["priority"] }.reverse
  end

  def data_sort_by_title(data)
    data.sort_by { |_, m| m["title"] }
  end

  def strip_img(data)
    doc = Nokogiri::HTML(data)
    doc.search(".//img").remove
    doc.to_html
  end
end
