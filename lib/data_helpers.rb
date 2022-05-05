module DataHelpers

  def data_select_by(data, type)
    data.select {|id,m| m["type"] == type}
  end

  def data_select_home(data)
    data.select {|id,m| m["home"] == true}
  end

  def data_sort_by_priority(data)
    data.sort_by {|id,m| m["priority"] }.reverse
  end

  def data_sort_by_title(data)
    data.sort_by {|id,m| m["title"] }
  end

  def strip_img(data)
    doc = Nokogiri::HTML(data)
    doc.search('.//img').remove
    doc.to_html
  end
end
