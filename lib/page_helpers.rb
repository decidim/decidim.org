# frozen_string_literal: true

module PageHelpers
  # Check if we're in the homepage
  #
  # @param current_path [String] The current page. We give it as a parameter to it's easier to test.
  # @return [Boolean]
  def homepage?(current_path = current_page.url)
    I18n.available_locales.map { |code| "/#{code}/" }.push("/").include? current_path
  end

  # Return true if the alert banner is enabled
  #
  # @param enabled [Boolean] Whether the alert is enabled. We give it as a parameter to it's easier to test.
  def alert_enabled?(enabled = data.alert.enabled)
    enabled
  end

  # Returns the translated key or in :en if it is not found in the selected language
  #
  # @param key [String] The key for translate.
  def fallback_translate(key)
    if I18n.exists?(key)
      I18n.t(key)
    else
      I18n.t(key, locale: :en)
    end
  end
end
