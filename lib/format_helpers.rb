module FormatHelpers

  def markdown(string)
    Tilt['markdown'].new(context: @app) { string }.render
  end

end
