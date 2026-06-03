# Decidim

This is a work in progress of the future web for Decidim project, the participatory democracy framework.

## Installation (with bundler)

Install the dependencies and start the middleman server.

```bash
bundle install
npm install
bundle exec middleman s
```

You can access to the development web with http://localhost:4567/

## Installation (with docker)

You can set it up with [Devcontainers](https://containers.dev/). We provide a wrapper for Devcontainer CLI to make the Developer Experience better.

```bash
bin/devcontainer rebuild
```

Then whenever you want to start the server, you can do it with

```bash
bin/devcontainer bundle exec middleman s
```

You can access to the development web with http://localhost:4567/

## Translations

You can help us with translations to your locale. For doing so, you can:

1. Go to [Decidim.org project](https://crowdin.com/project/decidimorg) at Crowdin.
2. If you see your langugage you can ask for permissions there, if not you can [Contact us](https://crowdin.com/messages/create/13134379/434002) so we can add your language.

Thanks!!

## Credits

* Made with [Middleman](https://middlemanapp.com/) and [TailwindCSS](https://tailwindcss.com/)
* Icons from [Remix Icon](https://remixicon.com/)
