# Testing

We use RSpec, run against the Middleman app through Capybara (`spec/spec_helper.rb`).

```bash
bundle exec rspec                   # whole suite
bundle exec rspec spec/lib          # helper unit specs
bundle exec rspec spec/system       # rendered-page specs
bundle exec rspec spec/system/index_spec.rb:12   # single example
```

- `spec/lib/` — unit specs for the helpers in `lib/`.
- `spec/system/` — Capybara specs that render real pages.
- System specs need Google Chrome installed; the driver runs headless.

Add or update a spec when you change a helper or a page's behaviour.
