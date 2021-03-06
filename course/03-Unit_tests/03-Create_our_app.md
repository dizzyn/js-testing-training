# 3.0 Say hello to Jest

> Unit tests are small pieces of code testing small pieces of your application code.
> It gives you fast and stable quality ensurance over primitive functions like counts and transformations.
> It also leades you to structure the source code better - to build the app from small, one purpose and directly accesible routines.
> Junit tests test the code isolated from real data and interactions.

## 1. Install the Jest library

Call `yarn add jest` and add a command shortcut into your `package.json`:

```json
    "start": "node index.js",
    "test": "jest",
    "test:watch": "jest --watchAll",
```

So now you can call `yarn start` to start the webservice and `yarn test` or `yarn test:watch` for testing it once or keep the testing engine running and fetching your code changes. That is quite helpful, it is called **test driven development**.

## 2. Write first test

Create file called `api.test.js` and put it into the `routes` folder. The name helps you to remember that there are tests for the file `api.js` the double extension `*.test.js` says to _Jest_ that there are some tests to run.

This is how tests looks:

```javascript
import { uppercase, cow } from "./api";

it("uppercase", () => {
  expect(uppercase("A")).toBe("A");
  expect(uppercase("a")).toBe("A");
});
```

I have imported the `uppercase` function so it had to be extracted from the function `api` and exported (the keyword `export`):

```javascript
export function uppercase(str: string) {
  return String(str).toUpperCase();
}

export default function api(req: Request, res: Response) {
  // ...
  if (action === "uppercase") {
    res.send(uppercase(str));
  } else if (action === "cow") {
  // ...
```

This is that moment when _Jest_ leads me to fragment the application into small pieces with a single purpose.

Now try to run the test by `yarn test` and see if it works. Then run `yarn test:watch` and conside edgecases for the `uppercase` function.

- What it should do with non-english local characters
- What it should do with chinese?
- What about whitespaces? etc.

And cover the scenarios:

```javascript
expect(uppercase("š")).toBe("Š");
expect(uppercase("ů")).toBe("Ú");
expect(uppercase(" ")).toBe(" ");
expect(uppercase("/n")).toBe("/n");
expect(uppercase("ěěšě")).toBe("ěěšě");
// ...
```

## 2. Write test for the cow

expect(uppercase("š")).toBe("Š"); so i can use snapshot

## 3. Test for api handler

So I have tested the core functions now I need to test the whole api handler, the funcion that validates parameters and then call the core functions according the parameter `action`.

Check what it does -there are objects that give us some data `req.query.action` and object on which I call functions `res.send("")`. So there is no easy way to test the result of the function. I need to create fake request object with query data and fake response object that let us call functions with some data.

```js
const req = {
  query: {},
};
const res = {
  status: jest.fn(),
  send: jest.fn(),
};
```

The `jest.fn()` is magic recorder that **Jest** give us to mock functions. It register all the calls so I can later ask who called you and what has told you. I have read the code and noticed that from all the functions we call on the `res` object just `status` for error codes and `send` for response body content. So i have mocked these functions on my fake `res` object.

```js
it("Missing parameter str", () => {
  const req = {
    query: {},
  };

  const res = {
    status: jest.fn(),
    send: jest.fn(),
  };

  api(req, res);
  expect(res.status).toBe(400);
  expect(res.send).toBe("str not given");
});
```

> Q. How many states we should test?

It looks like long row of similar test functions, we can create some abstraction for it:

```js
function testAPI(params, status) {
  const req = {
    query: { ...params },
  };
  const res = {
    status: jest.fn(),
    send: jest.fn(),
  };
  api(req, res);

  if (status) {
    // if the expected status is given test the equality
    expect(res.status).toBeCalledWith(status);
  }

  return res.send.mock.calls[0][0]; // return from the first call the first parameter of the function `send`
}

it("Missing parameters", () => {
  expect(testAPI({}, 400)).toBe("str not given");
  expect(testAPI({ str: "x" }, 400)).toBe("action not given");
});

it("Call uppercase", () => {
  expect(testAPI({ str: "a", action: "uppercase" })).toBe("A");
});
```

## 4. Test the cow again

```js
it("Call cow", () => {
  expect(testAPI({ str: "a", action: "cow" })).toEqual(cow("a"));
});

it("Call unknown action", () => {
  expect(testAPI({ str: "x", action: "??" }, 400)).toBe("Unknown action '??'");
});
```
