# frozen_string_literal: true

module IconHelpers
  def icon(id, args = {})
    if list_icons.include?(id)
      icon_reference = { "xlink:href" => "/images/remixicon.symbol.svg##{id}" }
      opts = { "fill" => "currentColor" }.merge(args)
      content_tag(:svg, content_tag(:use, "", icon_reference), opts)
    else
      image_tag(id, **args)
    end
  end

  def list_icons
    @list_icons ||= begin
      file = File.open("./source/images/remixicon.symbol.svg")
      Nokogiri::XML(file).css("symbol").map { |node| node["id"] }
    end
  end
end
