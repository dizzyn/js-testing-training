# First audit

> So we have nice app with two interfaces - one is for machines - **the api** route and the second for rational beeings - **the frontend**. Lets review that deeply and find some bugs.

Do we understand the application well?

Q: Are there any external libraries used on frontend?
Q: Is the frontend code transpilled by the Babel?
Q: Who can access the sourcecode of the `index.js`
Q: Who can acces the file `page.html`
Q: Can anybody request by the root route `/` anything else than the file `page.html`?
Q: Can anyone place malitious code into the frontend?
Q: Can anyone place malitious code into the backend?

There are now test automation so lets test the app manually for now. What have you found, I have found these:

- The uppercase doesn't support czech, russian and chinese characters.
- The string parameter failed with spaces in it.

So lets go and fix all the bugs for once and setup some automation tests that can ensure the quality for future.

Lets put TODO's everywhere we feel some troubles
