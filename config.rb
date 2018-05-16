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

# Blog
activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"
  blog.paginate = true
  blog.permalink = "{lang}/{year}-{month}-{day}-{title}.html"
  # Matcher for blog source files
  blog.sources = "{lang}/{year}-{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "layout-blog"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".md"

  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

# Features page
activate :asciidoc, layout: :asciidoc
