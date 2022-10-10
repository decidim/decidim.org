# frozen_string_literal: true

module I18nHelpers
  # Return the current path for a given locale.
  # This is used on the language selector, so we can link to the same page where we are,
  # instead of linking to the root page of all the languages.
  #
  # @see https://gist.github.com/johnnyshields/98a695df51b1e99f3593579d3c9a3fd1
  # @param loc [Symbol] The current locale
  # @param current_path [String] The current page. We give it as a parameter to it's easier to test.
  def current_path_for_locale(loc = I18n.locale, current_path = current_page.url)
    url_regex = %r{\A/(?:(#{I18n.available_locales.join('|')})/)?}
    if current_path.gsub(url_regex, "").blank?
      home_for_locale(loc)
    else
      current_path.gsub(url_regex, root_for_locale(loc))
    end
  end

  # Return the homepage for a given locale.
  #
  # @see https://gist.github.com/johnnyshields/98a695df51b1e99f3593579d3c9a3fd1
  # @param [Symbol]
  # @return [String]
  def home_for_locale(loc = I18n.locale)
    root_for_locale(loc)
  end

  # Return the root for a given locale.
  # As we have configured the :mount_at_root setting with English, then we return the "/" for :en
  #
  # @see https://gist.github.com/johnnyshields/98a695df51b1e99f3593579d3c9a3fd1
  # @param [Symbol]
  # @return [String]
  def root_for_locale(loc = I18n.locale)
    loc.to_s == "en" ? "/" : "/#{loc}/"
  end

  def url(path)
    # Don't append pathname if these match
    return path if URI(path).scheme.present? || path.start_with?("/blog")

    t(:path) + path
  end

  # Wheter if we show the language selector or not
  # On the case of the blog section we don't, as we don't translate all the blog posts to all the locales
  #
  # @return [Boolean]
  def show_language_selector?
    !current_page.path.include?("blog")
  end
end
