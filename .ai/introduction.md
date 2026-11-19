# Introduction

This repository is the [decidim.org](https://decidim.org) website, a static site built with
Middleman (Ruby) and Tailwind CSS, with a Sveltia CMS admin for editing content.

## Tech stack

- **Middleman** — static site generator (see `config.rb`)
- **Sveltia CMS** — Git-based admin at `/admin` (config in `source/admin/config.yml`)
- **Tailwind CSS** — built by a Middleman external pipeline (`tailwind.config.js`)
- **esbuild** — vendor JS bundle (`esbuild.config.js`)
- **Docker + nginx** — production image builds the site and serves it from `build/`
  (`Dockerfile`, `nginx.conf`)

## Repository layout

| Path              | Contents                                                        |
|-------------------|-----------------------------------------------------------------|
| `source/`         | Site content: pages, blog, case studies, partners, layouts, partials, styles, images |
| `source/admin/`   | Sveltia CMS config and entry point                              |
| `lib/`            | Middleman view helpers, registered in `config.rb`               |
| `locales/`        | Translation files (managed by Crowdin)                          |
| `spec/`           | RSpec tests for helpers (`spec/lib`) and rendered pages (`spec/system`) |
| `bin/`            | Devcontainer wrapper and setup script                           |
| `build/`          | Generated output (ignored by git)                               |

## Development

```bash
bundle install
npm install
bundle exec middleman server   # http://localhost:4567
```
