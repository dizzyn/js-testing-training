# 1. Create our app

> Lets create simple app that help us overview the principes of testing automation.
> Funny fact: Seems that coding is the main activity if QA engeneering nowdays. Ok, it is not so funny.

## 1. Prepare folder and activate `git`

Git will help us manage file changes. You can name the folder `the_app`.

```shell
mkdir the_app
cd the_app
git init
```

Our plan is to write frontend in the javascript as same as backend. So you need `Node` - the javascript interpret as same as `yarn` - the package manager. Install them your favorite way and init package manager in your folder. Run `yarn init` - it will ask you many questions, none of them is important for now.

## 2. Start scripting

In your favorite source coding editor create the first file of your app `index.js`, put there first command `console.log("Hellow Word")` and run it by `node index.js`. Does it work?

## 3. Add first dependency

Now we can build a simple webservice on that. Install first 3rd party library - `Express.js` the well known webserver run `yarn add express`. Now you can use it by:

```javascript
const express = require("express"); // import the library

const app = express(); // init the webserver

// our main route
app.get("/", function (req, res) {
  res.send("Hello word");
});

console.log("Listening at http://localhost:3000 - press [CMD + C] to exit");
app.listen(3000); // pst. server is listening :)
```

In the middle you see the route `/` replies by the string on any request to the `http://localhost:3000/` root. There are two parameters of the function:

- The first one `req` - an object represents the http request provided by browser or any other client app. It contains URL with parameters, client cookies, HTTP headers represents metadata from client side and much more.
- The second one `res` - is an object that defines response from the server. We can set there a body of the response (the plain text in our case), new cookies, caching requirements and all the HTTP headers we know: `conet-type`, cross site scripting rules, favicon, respone codes (`200`, `304`, `404`, `500`...)

You can name the parameters anyway, just the order is significant. Now try your new webservice by your favorite browser. Does it work?

## 4. Check the app folder

So we have some new files there. The index.js you have wrote and your `package.json` created by the `yarn init`. There is your only dependency the `express` library in it. You can add there a shortcat for app starting:

```json
  "scripts": {
    "start": "node index.js"
  },
```

You also have there `yarn.lock` and folder `node_modules`. That are results of package manager `yarn` activity. The lock file is record of installed packages and the folder contains these packages. The folder should not be versioned by `git`. Every computer should recosnstruct the packages folder again from requirements (`package.json`) and the record (`yarn.lock`). So create file called `.gitignore` in your root and put hrere single line `node_modules`. I guess that is all from your files for now.

---

> So we have nice webservice serving `hello world` to anybody interested. It is a great seed for our app. There are some questions:

- Q: How it is that you have installed just the `express` but the `node_modules` folder is full of packages?
- Q: What means all the things in the `package.json`
- Q: What are the all files and folders for?
