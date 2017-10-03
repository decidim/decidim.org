# Decidim

This is a work in progress of the future web for Decidim project, the participatory democracy framework. 

Based on Hydra, a site template initially made for Jekyll, we've migrated it to Middleman. Browse through a [live demo](https://proud-alligator.cloudvent.net/). 

Hydra was made by [CloudCannon](http://cloudcannon.com/), the Cloud CMS for Jekyll.

## Installation 

If you use Ubuntu, you have an installation script: 

```
$ ./install_ubuntu.bash
```

If you don't, you need to install rbenv or rvm and bundler. 
Then you need to install the dependencies using bundler: 

```
$ bundle install
```

## Starting the server

On this directory, execute

```
$ bundle exec middleman serve
```

You can access to the development web with http://localhost:4567/

