module IconHelpers
  def icon(id, args = {})
    if list_icons.include?(id)
      content_tag(:svg, content_tag(:use, "", { "xlink:href" => "/images/remixicon.symbol.svg#" + id.to_s }), { "fill" => "currentColor" }.merge(args))
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
