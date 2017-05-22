#!/usr/bin/env node

var osmosis = require('osmosis');

let url = process.argv[2] || 'http://localhost:9999/in.html';

let textOnly = false;

osmosis
  .get(url)
  .find('li._698') // friend element
  .set({
    'avatar': 'img._s0@src',
    'name': 'img._s0@aria-label',
    'link': 'a._5q6s@href'
  })
  .data(function(data) {
    // Filter out deactivated profiles
    if (typeof data.link !== "undefined") {
      // Strip URL arguments
      let link = data.link.substring(0, data.link.indexOf('?'));

      if (textOnly)
        console.log('<a href="' + link + '">' + data.name + '</a><br>')
      else
        console.log('<a href="' + link + '" title="' + data.name + '"><img src="' + data.avatar +'"></a>');
    }
  });