module I18nTitleHelpers
  def page_title(page)
    if defined?(page.data.nav)
      title = I18n.t("nav.#{page.data.nav}")
      return "#{title} | Decidim"
    end
    return "Decidim"
  end
end