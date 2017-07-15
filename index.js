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
  .find('li._698') // friend element
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