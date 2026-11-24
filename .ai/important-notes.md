# Important Notes

- Use the exact Ruby and Node versions in `.ruby-version` and `.node-version`.
- Development server: `bundle exec middleman server` (http://localhost:4567).
  Production build: `bundle exec middleman build`, output in `build/`, served by
  nginx (see `Dockerfile` and `nginx.conf`).
- Tests: `bundle exec rspec`. System specs render pages with Capybara and need
  Google Chrome. There is no database or background service to run.
- Content is edited through the Sveltia CMS at `/admin` (see
  `source/admin/config.yml`). For translations, only edit `locales/en.yml`.
- Details: `introduction.md`, `testing.md`, `linting.md`.
