module I18nTitleHelpers
  # https://github.com/middleman/middleman/issues/1594#issuecomment-138964995
  def page_title(page)
    return page.data.title.send(I18n.locale) if
      page.data.title.is_a?(Hash) && page.data.title[I18n.locale]
    return page.data.title if page.data.title
    return "Decidim"
  end
end

