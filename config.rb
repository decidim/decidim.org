require 'lib/i18n_helpers'
helpers I18nHelpers

# Activate multi-language
activate :i18n, :mount_at_root => :en

activate :directory_indexes

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

