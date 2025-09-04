# Assignment - Express Login

**Due by Wed Feb 12, 11:59pm **

## Submission Instructions

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'express-login' (`git checkout -b express-login`)
* Create a package.json and necessary files to complete the work described below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s).  

## Goals and Expectations

The application will be a site that allows multiple users to login, allows each user to read and update data specific to the user, and allows a user to login.  This application must NOT use passwords.  You will have to create the entire package and needed files.
- Special Note: We will not have a "register user" step.  When a user tries to login with a username, we will consider that a valid account (except for user "dog", which we will treat like a bad password, since we will not have password)

- The home page of the application must show:
  - A login form for users that are not "logged in"
  - A "data page" for users that ARE "logged in"
  - Both of these pages are dynamically generated
- The home page offers the option to logout IF the user is already logged in
- The data page will show current "stored word" for the current logged in user
- The data page will include a form to replace the stored word with a new one
- Multiple users can use the system without problems
  - Each with their own separate stored word
  - A user will always see the most recent version of their stored word at the time their page is loaded, even if that user had previously logged out or updated the secret word from a different browser
- You should demonstrate the skills taught in this course where applicable
- You will not be using HTTPS 
- You will not be using any password entry or handling
- See "Example Testing Flow" later to confirm your understanding.

### Visuals

You must show effort to make it visually attractive and usable
- Make different areas of content visually distinct using colors and/or spacing
- Make content legible using whitespace (padding, margin, line-height, etc)
- Interactions (form fields, buttons, links) must have text/labels to be understood by an uninformed user
    - Any form field must have a properly associated `<label>` element with a useful text label of the field
- Context (additional text/headings) should make it clear what content is being displayed
- The content should be responsive (text flow to fit) the page at desktop sizes 
  - Avoid fixed sizes on structural elements (those elements that would prevent responsive behavior)
  - Enforced reasonable visual gutters to keep content to a maximum width is allowed but not required
- Actions options must be placed reasonably
  - Example: "Logout" buttons aren't seen at the bottom of a page/form

### Logic

#### Login

- A user that is not logged in will be prompted to enter their username
    - Hint: the `/` route can simply return DIFFERENT response content.  A logged in user will see the data, a not-logged in user will see a login form
    - Hint: Showing different HTML content should just be your controller deciding to call and return a different view function
- The form that collects the username should POST to a different route (path is up to you)
- The server will create a UUID-based session id and store it in a cookie.  
    - Each browser a user logs in with must be a separate session id.  Do not reuse session ids, even for the same user
    - The server will also associate that sid with the username.  (hint: have the sid be a key for an object that is defined OUTSIDE the request handler in the server.  Set the value to an object, with `username` as one of the properties in that object)
- Login will fail for an empty username or the username "dog" or any username that is not made up of letters or numbers only
  - Hint: If you want to look into regular expressions, see the [/readings/js/regex.md](/readings/js/regex.md) file for some base info, then checkout https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
- If login fails due to an invalid username, you should respond with a 400 status code and an HTML web page that informs them and offers a link to see the login form again (this can be simply a link to the home page)
    - The user does not have to see the "400 status code", but it should be the status sent to the browser
    - Later we will talk about putting errors on the page instead of being a separate page with a link to try again
    - If login fails because the username is dog, you should respond with a 403 status code, but otherwise offer the same option to return to the login form above
    - Hint: use `res.status();` to set the status code you want to return.  You will still need to `.send(...);` the HTML content
- If login succeeds the server should respond with a redirect to the home page.

#### Data Page

- A user that is validly logged in will see the data page on `/`
- The data page will offer a button to logout (use POST to logout for this assignment)
    - This should be shown in an appropriate spot for a "logout" feature, such as the upper-left
- The data page will display a "stored word" specific to that user
  - The stored word for each user defaults to the empty string
    - Hint: If the is no stored word for the user (undefined), you can treat it as ""
  - The stored word is stored in the server memory
    - NOT sent as a cookie
  - Putting the stored word as the `value` of the form field to change it counts as displaying the stored word, but you can show it outside the field instead or in addition if you wish
- Include any prompts used to generate code as a comment in the generated code
- The data page has a form to change the stored word
  - Show an input of type text with a value of the current stored word value
  - The path of the route to change the stored word is up to you
- If a change is submitted, the server will record that change and associate it to the username and redirect to `/`
  - There is no required validation for the stored word
      - If you do choose to validate the stored word, an empty string must be allowed, but you can apply other rrestrictions as long as you tell the user what those restrictions are
  - Hint: Use a second object to hold the stored words.  Use keys of the username.  That way the data is associated with the user, not the session id. 
  - Every change attempt must make sure the session id is a valid user
  - Hint: To test that you have proper separation of the data for different users, try storing a word, logging out and logging in as a different user.  You must not see the stored word of the first user.  Then logout and log back in as the first user.  You must see the stored word of the first (and current) user.
  - Hint: To test that you are checking the session each time, try reloading the page.  You can also delete or change your session id cookie in the DevTools before submitting the change form to ensure that you are checking the session id on submit and not just on the / route.
- A user that sets a stored word, logs out, and later logs back in will still see their stored word
  - Hint: To test that you have proper separation of session data and user data, try storing a word, logging out, and logging back in as the same user.  You must see their stored word.
- Stored words can be different for different users
  - Hint: Use an incognito/private browser to login in as a second user at the same time your main browser window is logged in as a first user

#### Logout

- The logout route will:
  - Remove the session id from the object it is using to store the session info
    - Hint `delete obj.key` or `delete obj['key']` removes property `key` from object `obj`
  - Remove the cookie from the browser
  - Redirect the user to `/`
- The logout route will NOT:
  - Remove the stored word from being associated with that username
  - Hint: This means the session object doesn't hold the stored word.  Try using a second object that connects the username to the stored word, just like the session object connected the sid to the username.

#### Internals

* The application must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`
* You should try to follow an MVC structure: 
  - There should be code that manages stored values and changes to that data 
  - The code that generates HTML should be separate from the data logic
  - The code that generates HTML should be separate from the express route handlers
* Every response from the server should either be a redirect or include all required HTML structure
  - Example: Don't have `res.send('invalid username')` - that doesn't have the html/body/etc 

## Example Testing Flow

This may not be the only option available based on the instructions, but this will fulfill the instructions

1. Jorts, who is not yet logged in, loads the / page of the web app
    - Jorts sees a login form on the returned web page
2. Jorts fills in the username of "#$%@" and submits
    - Jorts sees a web page with:
        - an error message about an invalid username
        - a link to /
        - The status code for this response is 400
3. Jorts returns to / to see the login form and tries to login as "dog"
    - Jorts sees a web page with:
        - an error message about user not allowed
        - a link to /
        - The status code for this response is 403
4. Jorts returns to / to see the login form and tries to login with no username ("")
    - Jorts sees a web page with:
        - an error message about an invalid username
        - a link to /
        - The status code for this response is 400
5. Jorts returns to / to see the login form and tries to login as "Jorts"
    - Jorts gets a redirect response to /
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The current stored word for Jorts (defaults to "")
        - A form to change the value of the stored word
        - An option to logout
6. Jorts uses the from to store the word "closet"
    - Jorts gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The stored word of "closet"
        - A form to change the value of the stored word
        - An option to logout
7. Jean (using an different browser or browser profile on the same computer, NOT just a different tab) loads /
    - Jean sees a login form on the returned web page
8. Jean logs in as "Jean"
    - jean gets a redirect to /
    - the browser automatically follows the redirect and shows / in the url
    - jean sees a web page with:
        - the current stored word for jean (defaults to "", is not "closet")
        - a form to change the value of the stored word
        - an option to logout
9. Jean uses the form to store the word "nap"
    - Jean gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jean sees a web page with:
        - The current stored word for Jean ("nap")
        - A form to change the value of the stored word
        - An option to logout
10. Jorts (still looking at a page that says "closet") reloads the page in the browser
    - Jorts does NOT get any warning from the browser about reloading a POST
    - Jorts sees a web page with:
        - The stored word of "closet" (not "nap")
        - A form to change the value of the stored word
        - An option to logout
11. Jorts logs out
    - Jorts gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a login form on the returned web page
12. Jean leaves the other browser window open an uses the browser window Jorts was using, and logs in as "Jean"
    - Jean gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jean sees a web page with:
        - The current stored word for Jean ("nap")
        - A form to change the value of the stored word
        - An option to logout
    - Both browser windows are now logged in as Jean and showing the same word
13. Jean logs out of both browser windows.  For both windows:
    - Jean gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jean sees a login form on the returned web page
14. Jorts returns to one of the browsers and logins in as "Jorts"
    - Jorts gets a redirect response to /
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The current stored word for Jorts ("closet")
        - A form to change the value of the stored word
        - An option to logout
15. Jorts changes the stored word to "trashbin"
    - Jorts gets a redirect response to /
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The current stored word for Jorts ("trashbin")
        - A form to change the value of the stored word
        - An option to logout

## Allowances
* You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
* You may create your HTML as you see fit, but it must be fundamentally semantically valid and follow other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class and the Restrictions below
* You may add icons and background images but there is no requirement to do so

## Restrictions
* You must install `express`, `cookie-parser` modules ONLY
  - Do not install/use `express-session` module
  - Do not install/use `uuid` module  
    - Use the built in `crypto.randomUUID()`
  - `jest` or `vitest` are allowed if you add unit tests for your content, but (sadly) no test code will be graded
    - Remember that a unit test should not test the server itself.
- Do not write your code as ES Modules (import), you must use CommonJS (require)
  - We will switch to ESM later in the semester
* Do not use external JS other than base express and cookie-parser
* Do not use external CSS libraries
* Do not use floats to do more than manage flowing text with images
* Do not use HTML tables for layout or CSS table layouts
* Do not use client-side/browser-side Javascript
* Do not use Map() or Set() for this assignment
  * In order to ensure you know how to use objects and arrays for the purposes
  - .map() on arrays is different than the Map data structure created with Map().  You are allowed and encouraged to use .map() on arrays for assignments
* Do not use `alert`, `prompt`, `confirm`, or other blocking JS
* Do not use localStorage or other client-side storage other than a cookie to hold your session id
* Do not use meta tag refreshes
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS

## Grading

Note: The assignment is to show your understanding of the material from class.  If you don't show your understanding of class material, you can lose points, even if your assignment "works".  

**Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).**

This assignment is graded as a base of 100 points
- Each Critical Requirement you miss is a minimum of -10 points, and may lose more
- Each Additional Requirement you miss is -2 points.  There may be MANY non-critical requirements, and they add up!
- If you are not showing the lessons from class, your grade will be worse or even given a 0. Each week builds on the material from the previous week so it is important that you learn and practice the lessons from class.

### Critical Requirements
- Your submission demonstrates that you practiced the overall purpose of the assignment
- You create a PR with your code for this assignment roughly following the course process
- Your code runs (with or without correct answers) when invoked using `npm install` and `node server.js`
- PR does not contain changes to files unrelated to the assignment
  - a root `.gitignore` file IS related and may be included
- Your user data is not stored in a session and that data is sustained after logout/login
- You correctly handle user data for multiple users
- You do not request or store passwords or password-related data
- The same user logging in with multiple browsers will get different session ids for each
- You obeyed each of the listed "Do not" under "Restrictions"
- Do not use `style` attributes
- Do not write `<style>` elements

### Additional Requirements
- Your PR has the correct branch name and follows other course expectations for a PR
- Your commit message should be a single sentence that completes the phrase "these changes _______"
- Your commit message makes sense if someone reading it doesn't know what assignment it is part of
- You removed/updated any comments that no longer apply to your files
- You followed the MVC practices shown in class
  - The exact files, file names, and details can vary as long as you are following an MVC breakdown
- Your home page dynamically shows the correct HTML without performing a redirect
- A successful login creates the session and ends with a redirect to the home page
- You handle invalid usernames as required
- Your check to determine invalid usernames is based on allowlisting, not denylisting
- You handle username "dog" as required
- Only users with a valid session id are shown the option to logout
- Users with a valid session id cookie are not prompted to login
- Explicitly logging out removes both the sid cookie and the sid in server memory
- You followed the best practices listed in the course so far, including but not limited to (each a separate requirement):
  - You used `const` instead of `let` when a variable was not reassigned
  - You did not use `var`
  - You used semicolons at the end of your statements
  - You used consistent indentation and spacing to make your code easier to read
  - You included blank lines to separate sections of code into "paragraphs"
  - You gave your files, variables, and functions useful and descriptive names
  - You used camelCase variable names
  - You did not use an array when an object makes more sense
    - An object makes more sense when you access elements by something other than position
    - Looping through or searching an array for a value is a sign you should have used an object
  - You did not use a C-Style for loop when a `for...of` loop would work
  - You used explicit `{...}` blocks for any `if (...){...}/else (...) {...}` and `for (...) {...}` constructions
  - Use semantic HTML elements when appropriate
  - Do not pick your HTML elements for their default rendered appearance
  - Do not use HTML elements to create space (no empty `<p>` elements, no `<br>` to create blank lines)
  - Properly indent HTML and CSS
  - Have no spaces around a "=" in an HTML attributes
  - Use double quotes around an HTML attribute value
  - Do not have multiple `<h1>` elements
  - Do not skip `<h1>`-`<h6>` levels
  - Each section subheading (`<h2>-<h6>`) should be a subheading of the previous heading of one number less
  - HTML/CSS classes must be semantic (not utility)
  - HTML/CSS classes must be kebab-case or BEM two dashes style
  - CSS declarations have a space after the `:`
  - CSS selectors tend to use class names 
  - CSS selectors with just element types or combinations of types are setting defaults for that element type, not a specific appearance for a particular usage of that element type
  * Do not have console.log messages related to debugging
  * Do not have commented out code
  * Do not have comments that explain what the code itself says
    - Comments should explain WHY code is doing what it does, provide context, or (very rarely) explain a dense/complex algorithm
- Any other detail mentioned in class or the instructions may be an Additional Requirement
