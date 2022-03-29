module IconHelpers
  def icon(id, args = {})
    content_tag(:svg, content_tag(:use, "", { "xlink:href" => "/images/remixicon.symbol.svg#" + id.to_s }), { "fill" => "currentColor" }.merge(args))
  end

  def list_icons
    file = File.open("./source/images/remixicon.symbol.svg")
    Nokogiri::XML(file).css("symbol").map { |node| node["id"] }
  end
end
