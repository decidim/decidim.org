# frozen_string_literal: true

module I18nHelpers
  # https://gist.github.com/johnnyshields/98a695df51b1e99f3593579d3c9a3fd1

  def current_path_for_locale(loc = I18n.locale, is_link = true)
    return "javascript: void(0);" if is_link && I18n.locale == loc

    url_regex = %r{/\A(?:(#{I18n.available_locales.join("|")}))?/}
    if current_page.url.gsub(url_regex, "").blank?
      home_for_locale(loc)
    else
      current_page.url.gsub(url_regex, root_for_locale(loc))
    end
  end

  def home_for_locale(loc = I18n.locale)
    root_for_locale(loc)
  end

  def root_for_locale(loc = I18n.locale)
    loc == "en" ? "../" : "/#{loc}/"
  end

  def url(path)
    # Don't append pathname if these match
    return path if URI(path).scheme.present? || path.start_with?("/blog")

    t(:path) + path
  end

  def show_language_switcher?
    !current_page.path.include?("blog") # rubocop:disable Rails/NegateInclude
  end

  # In order to get a successful build, it requires to parse the missing i18n keys
  # for languages others than english, so this function returns the translations if exists
  # otherwise it returns a default value
  def t_with_default(key, default = {})
    t(key, default: "").presence || default
  end
end
