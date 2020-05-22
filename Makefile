# Configurable variables
REMOTE_HOST := webhost1.hosting.netent.co.nz
REMOTE_PATH := /var/www/html/meet.paulwillard.nz
REMOTE_USER := paul
URL := https://meet.paulwillard.nz
JSBUNDLE_DIR := assets/js
VENDOR_DIR = assets/vendor
# No other changes should be necessary 

SHELL := /bin/bash
NPM := /usr/bin/npm
JEKYLL := ~/gems/bin/jekyll
BUNDLE := ~/gems/bin/bundle

SCRIPT_NAME := make
VERSION := "2020-05-22 v1.0"

NURL := $(shell node --eval "console.log(encodeURIComponent('$(URL)'))")
NFEED := $(shell node --eval "console.log(encodeURIComponent('$(URL)/feed.xml'))")
BLOGNAME := MeetPaulWillard

PINGOURL := $(shell printf "http://pingomatic.com/ping/?title=%s&blogurl=%s&rssurl=%s&chk_weblogscom=on&chk_blogs=on&chk_feedburner=on&chk_newsgator=on&chk_myyahoo=on&chk_pubsubcom=on&chk_blogdigger=on&chk_weblogalot=on&chk_newsisfree=on&chk_topicexchange=on&chk_google=on&chk_tailrank=on&chk_skygrid=on&chk_collecta=on&chk_superfeedr=on" "$(BLOGNAME)" "$(NURL)" "$(NFEED)")
GOOGLEURL := $(shell printf "http://www.google.com/webmasters/tools/ping?sitemap=%s" "$(NFEED)")
BINGURL := $(shell printf "http://www.bing.com/webmaster/ping.aspx?siteMap=%s" "$(NFEED)")

.PHONY: all help update build server push

all : install

help:
	@echo 'Version $(VERSION) '
	@echo 'This is a small Makefile that updates, builds, and serves a local Jekyll project'
	@echo 'it can only take one argument at a time.'
	@echo ''
	@echo 'Usage:'
	@echo '$(SCRIPT_NAME) [single option]'
	@echo ''
	@echo ''
	@echo 'Options'
	@echo '     help        Show this help screen'
	@echo '     check       an alias for $(BUNDLE) exec $(JEKYLL) doctor'
	@echo '     update      Update your npm packages ($(NPM) update && $(NPM) install)'
	@echo '     build       Build your Jekyll project'
	@echo '     serve       start a local Jekyll server ($(BUNDLE) exec $(JEKYLL) serve)'
	@echo '     push        push _site to live using rsync'
	@echo '     install     an alias for "$(SCRIPT_NAME) build && $(SCRIPT_NAME) push"'

check:
	@$(BUNDLE) exec $(JEKYLL) doctor

install: build push

update: include-npm-deps
	@$(NPM) update
	@$(NPM) install
	@echo "Maybe run"
	@echo " gem update"
	@echo " sudo gem update --system"
	@echo " $(BUNDLE) update --all"

include-npm-deps:
	@if [ ! -d "$(VENDOR_DIR)" ]; then mkdir -p $(VENDOR_DIR); fi
	@if [ ! -d "$(JSBUNDLE_DIR)" ]; then mkdir -p $(JSBUNDLE_DIR); fi
	@cp node_modules/jquery/dist/jquery.min.js $(VENDOR_DIR)
	@cp node_modules/popper.js/dist/umd/popper.min.js $(VENDOR_DIR)
	@cp node_modules/bootstrap/dist/js/bootstrap.min.js $(VENDOR_DIR)
	@cp node_modules/jquery/dist/jquery.min.map $(JSBUNDLE_DIR)
	@cp node_modules/popper.js/dist/umd/popper.min.js.map $(JSBUNDLE_DIR)
	@cp node_modules/bootstrap/dist/js/bootstrap.min.js.map $(JSBUNDLE_DIR)
	@echo "copying node files into $(VENDOR_DIR) and node map files into $(JSBUNDLE_DIR)"

build: include-npm-deps
	@cat $(VENDOR_DIR)/jquery.min.js <(echo) $(VENDOR_DIR)/popper.min.js <(echo) $(VENDOR_DIR)/bootstrap.min.js <(echo) assets/js/meet.pw.min.js  > $(JSBUNDLE_DIR)/bundle.js
	@export JEKYLL_ENV=production
	@echo "Building Production _site"
	@$(BUNDLE) exec $(JEKYLL) build

serve:
	export JEKYLL_ENV=production
	$(BUNDLE) exec $(JEKYLL) serve --host=0.0.0.0

rsync:
	@if [ ! -d "_site" ]; then echo "_site/ directory does not exist !"; exit 0; fi
	@rsync -avz --delete _site/* $(REMOTE_USER)@$(REMOTE_HOST):$(REMOTE_PATH)

PingSearchEngine:
	@echo "Pinging ping-o-matic, Google, and Bing"
	@$(shell curl --silent "$(PINGOURL)" > /dev/null)
	@$(shell curl --silent $(GOOGLEURL) > /dev/null)
	@$(shell curl --silent $(BINGURL) > /dev/null)

push: rsync PingSearchEngine

