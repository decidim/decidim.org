module I18nHelpers
  # https://gist.github.com/johnnyshields/98a695df51b1e99f3593579d3c9a3fd1

  def current_path_for_locale(loc = I18n.locale, is_link = true)
    return 'javascript: void(0);' if is_link && I18n.locale == loc

    url_regex = /\A\/(?:(#{I18n.available_locales.join('|')})\/)?/
    current_page.url.gsub(url_regex, '').blank? ?
        home_for_locale(loc) :
        current_page.url.gsub(url_regex, root_for_locale(loc))
  end

  def path_for_locale(path, loc = I18n.locale)
    root_for_locale(loc) + path
  end

  def home_for_locale(loc = I18n.locale)
    root_for_locale(loc)
  end

  def root_for_locale(loc = I18n.locale)
    loc == "en" ? '/' : "/#{loc}/"
  end

end
