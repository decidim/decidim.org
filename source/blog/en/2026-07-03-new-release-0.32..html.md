---
title: New release 0.32.
tags: ''
---

![](/uploads/Post%20LinkedIn%2834%29.png)

## Improvements to existing features

## New front-end navigation experience

This version's headline feature is a redesigned navigation system, built to make in-depth browsing within Decidim easier and more intuitive. The upgrade centers on two major improvements: a new menu for both desktop and mobile, and a redesigned breadcrumb trail that helps users track where they are within a participatory space.

![](/uploads/Frame%201%285%29.png)

You can check all the PRs related:

- Implement breadcrumb navigation [#15141](https://github.com/decidim/decidim/pull/15141)
- Implement new menu in frontend [#15134](https://github.com/decidim/decidim/pull/15134)
- Add language chooser to header [#15365](https://github.com/decidim/decidim/pull/15365)
- Remove the "Global menu" content block [#15135](https://github.com/decidim/decidim/pull/15135)

## Members in restricted and transparent spaces

- Replace private/transparent with access mode in Processes and Assemblies [#15895](https://github.com/decidim/decidim/pull/15895)
- Rename private participants to members [#15749](https://github.com/decidim/decidim/pull/15749)

## Elections

A series of improvements have been made to enhance the new election component, including the ability for participants to verify whether they are on the census before starting the election.

- ![](/uploads/Release%20Party%20-%2014_05_2026%283%29.png)

Add “Maximum choices” field for Election questions [#15318](https://github.com/decidim/decidim/pull/15318)

- Add pre-election census check for scheduled elections [#15329](https://github.com/decidim/decidim/pull/15329)
- Display the description of each question in the voting booth [#15324](https://github.com/decidim/decidim/pull/15324)

## Improvements to comments performance

- Improve comments performance [#16073](https://github.com/decidim/decidim/pull/16073)

## Improvements to sorting options

- Be smart with the 'with more authors' sorting option [#16104](https://github.com/decidim/decidim/pull/16104)
- Be smart with the 'most commented' sorting option [#16136](https://github.com/decidim/decidim/pull/16136)
- Be smart with the 'most liked' sorting option [#16300](https://github.com/decidim/decidim/pull/16300)
- Document why the "Most followed" sorting option is shown [#16542](https://github.com/decidim/decidim/pull/16542)

## New elements added to the write API

- Write API: create proposals [#15790](https://github.com/decidim/decidim/pull/15790)
- Write API: create debates [#15801](https://github.com/decidim/decidim/pull/15801)
- Write API: update meetings [#15797](https://github.com/decidim/decidim/pull/15797)
- Write API: update proposals [#15795](https://github.com/decidim/decidim/pull/15795)
- Write API: update debates [#15802](https://github.com/decidim/decidim/pull/15802)
- Write API: vote/unvote proposals [#15791](https://github.com/decidim/decidim/pull/15791)
- Write API: add participant details [#14885](https://github.com/decidim/decidim/pull/14885)

## Ruby on Rails update to 8.1

We are updating to the last Rails version, 8.1. This version has security support until October 2027. You can check the related PR for more details: [Upgrade to Rails 8.1.2](https://github.com/decidim/decidim/pull/16310).

## Add locale to the URL

For a long time Decidim has been using internally the user browser to detect the language of the user. This has been changed to use the locale of the URL instead. You can read more about this change on PR [#14432](https://github.com/decidim/decidim/pull/14432).

## Deprecating features

We are continuing our efforts to streamline Decidim’s source code to make it more lightweight and maintainable in the long term. As part of this, we have deprecated three features that were no longer in use and were creating technical debt:

- Polls in meetings
- Collaborative drafts in proposals
- Sortitions component

Check out the full changelog and the long list of fixes and improvements for developers: [https://github.com/decidim/decidim/blob/release/0.32-stable/CHANGELOG.md](https://github.com/decidim/decidim/blob/release/0.32-stable/CHANGELOG.md)
