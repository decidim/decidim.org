# frozen_string_literal: true

# Helper methods for generating page titles with proper localization.
module I18nTitleHelpers
  def page_title(page)
    return "#{I18n.t("nav.#{page.data.nav}")} | Decidim" if defined?(page.data.nav)
    return "#{page.data.title} | Decidim" if defined?(page.data.title)

    "Decidim"
  end
end
