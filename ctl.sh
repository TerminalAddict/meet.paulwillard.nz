#!/bin/bash
VENDOR_DIR=assets/vendor
NPM=/usr/bin/npm
JEKYLL=~/gems/bin/jekyll
BUNDLE=~/gems/bin/bundle
JSBUNDLE_DIR=assets/js
REMOTE_HOST=webhost1.hosting.netent.co.nz
REMOTE_PATH=/var/www/html/meet.paulwillard.nz
REMOTE_USER=paul

# stuff required to ping search engines
# requires node to be installed to work
URL=`node --eval "console.log(encodeURIComponent('https://meet.paulwillard.nz'))"`
FEED=`node --eval "console.log(encodeURIComponent('https://meet.paulwillard.nz/feed.xml'))"`
BLOGNAME=MeetPaulWillard

VERSION="2018-10-15 v1.0"

PingSearchEngine() {
    PINGOURL=$(printf "http://pingomatic.com/ping/?title=%s&blogurl=%s&rssurl=%s&chk_weblogscom=on&chk_blogs=on&chk_feedburner=on&chk_newsgator=on&chk_myyahoo=on&chk_pubsubcom=on&chk_blogdigger=on&chk_weblogalot=on&chk_newsisfree=on&chk_topicexchange=on&chk_google=on&chk_tailrank=on&chk_skygrid=on&chk_collecta=on&chk_superfeedr=on" "$BLOGNAME" "$URL" "$FEED")
    GOOGLEURL=$(printf "http://www.google.com/webmasters/tools/ping?sitemap=%s" "$FEED")
    BINGURL=$(printf "http://www.bing.com/webmaster/ping.aspx?siteMap=%s" "$FEED")

    echo "Pinging ping-o-matic, Google, and Bing"
    curl --silent $PINGOURL > /dev/null
    curl --silent $GOOGLEURL > /dev/null
    curl --silent $BINGURL > /dev/null
}

ShowHelp() {
    SCRIPT_NAME="$(basename "$(test -L "$0" && readlink "$0" || echo "$0")")"
    echo "
$SCRIPT_NAME version $VERSION

$SCRIPT_NAME is a small shell script that updates, builds, and serves a local Jekyll project
it can only take one argument at a time.
Usage:
$SCRIPT_NAME [sinlge option]


Options
 help, -h, --help               Show this help screen
 update, -u, --update           Update your npm packages ($NPM update && $NPM install)
 build, -b, --build             Build your Jekyll project
 server, -s, --server           start a local Jekyll server ($BUNDLE exec $JEKYLL serve)
 push, -p, --push               push _site to live using rsync
"
    exit 1
}

UpdateNPM() {
    if [ ! -d "$VENDOR_DIR" ]; then
        mkdir -p $VENDOR_DIR
    fi
    $NPM update
    $NPM install
    cp node_modules/jquery/dist/jquery.min.js $VENDOR_DIR
    cp node_modules/jquery/dist/jquery.min.map $JSBUNDLE_DIR
    cp node_modules/popper.js/dist/umd/popper.min.js $VENDOR_DIR
    cp node_modules/popper.js/dist/umd/popper.min.js.map $JSBUNDLE_DIR
    cp node_modules/bootstrap/dist/js/bootstrap.min.js $VENDOR_DIR
    cp node_modules/bootstrap/dist/js/bootstrap.min.js.map $JSBUNDLE_DIR 
    $BUNDLE
}

BuildBundledJS() {
    cat $VENDOR_DIR/jquery.min.js <(echo) $VENDOR_DIR/popper.min.js <(echo) $VENDOR_DIR/bootstrap.min.js <(echo) assets/js/meet.pw.min.js  > $JSBUNDLE_DIR/bundle.js
}

JekyllBuild() {
    BuildBundledJS
    export JEKYLL_ENV=production
    # $BUNDLE exec $JEKYLL build --incremental
    $BUNDLE exec $JEKYLL build
}

StartServer() {
    BuildBundledJS
    $BUNDLE exec $JEKYLL serve --host=0.0.0.0
}

PushLive () {
    if [ ! -d "_site" ]; then
        echo "_site/ directory does not exist !"
        exit 0
    fi
    rsync -avz --delete _site/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH
    # ssh $REMOTE_USER@$REMOTE_HOST "chown -R www-data:www-data $REMOTE_PATH"
    echo "Updating search.json on server"
    # ssh $REMOTE_USER@$REMOTE_HOST "php $REMOTE_PATH/assets/php/json.php > $REMOTE_PATH/assets/search.json"
    PingSearchEngine
}

case $1 in 
    (update)
        UpdateNPM
        ;;
    (-u)
        UpdateNPM
        ;;
    (--update)
        UpdateNPM
        ;;
    (help)
        ShowHelp
        ;;
    (-h)
        ShowHelp
        ;;
    (--help)
        ShowHelp
        ;;
    (build)
        JekyllBuild
        ;;
    (-b)
        JekyllBuild
        ;;
    (--build)
        JekyllBuild
        ;;
    (server)
        StartServer
        ;;
    (-s)
        StartServer
        ;;
    (--server)
        StartServer
        ;;
    (push)
        PushLive
        ;;
    (-p)
        PushLive
        ;;
    (--push)
        PushLive
        ;;
    (*)
        ShowHelp
        ;;
esac
