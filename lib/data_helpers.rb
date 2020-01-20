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

  def image_clean_path image_path
    image_path.sub("/source", "") if image_path.start_with? "/source"
  end

end