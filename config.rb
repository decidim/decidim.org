require 'lib/i18n_helpers'
require 'lib/i18n_title_helpers'
require 'lib/data_helpers'
require 'lib/format_helpers'

helpers I18nHelpers
helpers I18nTitleHelpers
helpers DataHelpers
helpers FormatHelpers

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

# Blog
activate :blog do |blog|
  blog.paginate = false

  blog.permalink = "blog/{year}-{month}-{day}-{title}.html"
  blog.sources = "blog/en/{year}-{month}-{day}-{title}.html"
  blog.layout = "layout-blog"
  blog.default_extension = ".md"
  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"
end

# Copy Netlify's _redirects file on build
proxy "_redirects", "netlify-redirects", ignore: true
