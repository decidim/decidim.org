#!/usr/bin/env bash

set -x 
set -e 

if !(test $(grep DISTRIB_ID /etc/lsb-release)  == "DISTRIB_ID=Ubuntu") ; then
  echo "You don't use Ubuntu. Please install it by hand" 
  exit 1
fi

sudo apt-get update
sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
rbenv install 2.4.0 
rbenv global 2.4.0
echo "gem: --no-document" > ~/.gemrc
gem install bundler
bundle install 
echo "***************************"
echo "ALL INSTALLED" 
bundle exec middleman serve
