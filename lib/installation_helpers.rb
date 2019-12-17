module InstallationHelpers

  def extract_by(installations, type)
    result = []
    installations.each do |i|
      result << i if i[1]["type"] == type
    end
    # FIXME: this should work and it's nicer :/
    #result = installations.select {|i| i[1]["type"] == type}
    result.sort_by {|i| i[1]["priority"] }.reverse
  end

  def installations_home(installations)
    result = []
    installations.each do |i|
      result << i if i[1]["home"] == true
    end
    # FIXME: this should work and it's nicer :/
    #result = installations.select {|i| i[1]["home"] == true}
    result.sort_by {|i| i[1]["priority"] }.reverse
  end

  def image_clean_path image_path
    image_path.sub("/source", "") if image_path.start_with? "/source"
  end

end
