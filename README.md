Build a clean list of profile links from a saved page of Facebook friends

## How to use

First, `yarn install` dependencies. Then:

- Go to: https://www.facebook.com/me/friends
- Scroll down, repeatedly, until all of your friends are loaded
- Save the page as `in.html`
- *(Optional)* For the ultimate experience, run `in.html` through [inliner](https://github.com/remy/inliner) to create a self-contained HTML file
- Host `in.html` on a local server at `http://localhost:9999/in.html`
- Run `./index.js > friends.html`

Open `friends.html` in your browser. Enjoy Facebook!

## Does this work with my friend's friends?

Yes it does.

## License

ISC