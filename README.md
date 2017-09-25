Generate an HTML page of all of your Facebook friends so you can click them to visit their profiles.

![Screenshot](screenshot.png)

## How to use

First, `yarn install` dependencies. Then:

- Go to: https://www.facebook.com/me/friends
- Scroll down, repeatedly, until all of your friends are loaded
- Save the page as `in.html`
- *(Optional)* For the ultimate experience, use [inliner](https://github.com/remy/inliner) to create a self-contained HTML file:
  ```
  inliner in.html > out.html && mv out.html in.html
  ```
- Run `./index.js in.html > friends.html`

Open `friends.html` in your browser.

## Does this work with my friend's friends?

Yes it does. Try it with: https://www.facebook.com/tknomad/friends

## License

ISC