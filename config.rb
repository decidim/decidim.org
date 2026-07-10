# frozen_string_literal: true

require "debug"

require "lib/i18n_helpers"
require "lib/i18n_title_helpers"
require "lib/data_helpers"
require "lib/format_helpers"
require "lib/icon_helpers"
require "lib/page_helpers"
require "lib/facts_helpers"
require "lib/map_helpers"

helpers I18nHelpers
helpers I18nTitleHelpers
helpers DataHelpers
helpers FormatHelpers
helpers IconHelpers
helpers PageHelpers
helpers FactsHelpers
helpers MapHelpers

# Activate multi-language
activate :i18n, mount_at_root: :en, langs: [:en, :es, :eu, :ca, :cs, :fr, :de, :hu, :ja, :"pt-BR", :ro, :fi]

activate :directory_indexes

# Fallback to en when strings are missing in other locales
ready do
  I18n::Backend::Simple.include(I18n::Backend::Fallbacks)
  I18n.backend.extend(I18n::Backend::Fallbacks)
  I18n.fallbacks = I18n::Locale::Fallbacks.new(
    es: [:en], eu: [:en], ca: [:en], cs: [:en], fr: [:en],
    de: [:en], hu: [:en], ja: [:en], "pt-BR": [:en], ro: [:en], fi: [:en]
  )
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

activate :external_pipeline,
         name: :tailwindcss,
         command: "./node_modules/tailwindcss/lib/cli.js --postcss -i ./source/stylesheets/site.css -o ./source/vendor/tailwind.css #{build? ? "--minify" : "--watch"}",
         source: "source/vendor",
         latency: 1

activate :external_pipeline,
         name: :vendor_js,
         command: "node esbuild.config.js #{build? ? "--minify" : "--watch"}",
         source: "source/vendor",
         latency: 1

# Per-page layout changes
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

# Blog
activate :blog do |blog|
  blog.paginate = false
  blog.layout = "blog_layout"
  blog.permalink = "blog/{year}-{month}-{day}-{title}.html"
  blog.sources = "blog/en/{year}-{month}-{day}-{title}.html"
  blog.default_extension = ".md"
  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"
end

# Partners layout
activate :blog, name: "partners" do |cs|
  cs.paginate = false
  cs.layout = "partners_layout"
  cs.permalink = "partners/en/{title}.html"
  cs.sources = "partners/en/{title}.html"
  cs.default_extension = ".md"
end

configure :build do
  activate :images
end

# Copy Netlify's configurations file on build
proxy "_redirects", "netlify-redirects", ignore: true
proxy "_headers", "netlify-headers", ignore: true
