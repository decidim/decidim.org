# frozen_string_literal: true

# Helper methods for formatting content in various formats.
module FormatHelpers
  def markdown(string)
    Tilt["markdown"].new(context: @app) { string }.render
  end
end
