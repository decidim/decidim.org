module IconHelpers
  def icon(id)
    content_tag(:svg, content_tag(:use, "", { "xlink:href" => "/images/remixicon.symbol.svg#" + id.to_s }), { "width" => "1em", "height" => "1em" })
  end

  def list_icons
    file = File.open("./source/images/remixicon.symbol.svg")
    Nokogiri::XML(file).css("symbol").map { |node| node["id"] }
  end
end
