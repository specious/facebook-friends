#!/usr/bin/env node

var osmosis = require('osmosis'),
    fs = require('fs');

let textOnly = false;

let src = process.argv[2];

function printUsage() {
  console.log('Usage: ' + process.argv[1] + ' <file|url> > out.html');
  console.log();
}

if (typeof src === "undefined") {
  printUsage();
  process.exit(1);
}

function trimUrl(url) {
  let trimChar =
    (url.indexOf("https://www.facebook.com/profile.php") === 0) ?
      '&' : '?';

  return url.substring(0, url.indexOf(trimChar));
}

function readSource(src) {
  if (/^(http:|https:)?\/\//.test(src))
    return osmosis.get(src)
  else
    return osmosis.parse(fs.readFileSync(src))
}

readSource(src)
  .find('#fbProfileCover')
  .set({
    'avatar': 'img.profilePic@src',
    'name': '#fb-timeline-cover-name',
    'link': 'a._2nlw@href'
  })
  .data(function(data) {
    console.log('<div id="header">');
    console.log('  <a href="' + data.link + '"><img src="' + data.avatar + '" width="42"></a>');
    console.log('  <div style="display:inline-block">');
    console.log('    <h3 style="margin:8px">' + data.name + "'s facebook friends" + '</h3>');
    console.log('    <h4 style="margin:8px">Generated with: <a href="https://github.com/specious/facebook-friends">github.com/specious/facebook-friends</a></h4>');
    console.log('  </div>');
    console.log('</div>');
  })
  // Reset the data object
  //   ( ...as suggested by @rchipka in: https://github.com/rchipka/node-osmosis/issues/21#issuecomment-93947759 )
  .then(function(context, data, next) {
    next(context, {});
  })
  .find('li._698') // each friend element
  .set({
    'avatar': 'img._s0@src',
    'name': 'img._s0@aria-label',
    'link': 'a._5q6s@href'
  })
  .data(function(data) {
    // Filter out deactivated profiles
    //
    if (typeof data.link !== "undefined") {
      let link = trimUrl(data.link);

      if (textOnly)
        console.log('<a href="' + link + '">' + data.name + '</a><br>')
      else
        console.log('<a href="' + link + '" title="' + data.name + '"><img src="' + data.avatar +'"></a>');
    }
  });