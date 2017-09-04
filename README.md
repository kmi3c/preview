Ruby preview app
================
[![Build Status](https://travis-ci.org/kmi3c/preview.svg?branch=master)](https://travis-ci.org/kmi3c/preview)

### :hash: App description
-------------

Simple preview app made while my fathernity to show famliy some pictures of my doughter.

### :closed_lock_with_key: Technology stack
-------------

| Name |  Version |
| :--: | :---: |
| [Ruby](https://www.ruby-lang.org) | 2.4.1 MRI |
| [libmagic-dev](https://packages.debian.org/unstable/libdevel/libmagic-dev) | 1:5.29-3 |

### :book: Setup
-------------
1. `git clone` repository
2. `bundle install`
3. `bundle exec rspec`
3. `bundle exec rubocop`


#### :information_source: additional info
-------------
* Convention is that in app root there is `gallery` folder in which there are folders with images or movies files.
* Each folder should be name of `Album`.
* Every file in `Album` folder should be displayable in app.

#### :white_check_mark: To do and others ;)
-------------

* Add specs ;)
* Move `App` from `config.ru` to separte file.
* Move routes to seperate file.
* Move dependencies to single file.
* Configure/figureout `x-sendfile` with roda.
* Preprare `Slide` class wich should gather, paginate and serialize `Slide` instances.
* Resolve all `TODO`s leaved in comments.
