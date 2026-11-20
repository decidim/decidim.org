# Linting

- JavaScript (ESLint), checked in CI:

```bash
npm run lint
npm run lint:fix
```

- Ruby (RuboCop with the Decidim shared config), checked in CI:

```bash
bundle exec rubocop -P
bundle exec rubocop -a
```

- Translation keys: only edit `locales/en.yml` (see `locales.md`); keep keys sorted:

```bash
bundle exec i18n-tasks normalize --locales en
```
