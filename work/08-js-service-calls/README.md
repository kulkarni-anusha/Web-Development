# Assignment - JS Service Calls

* Due by **Wed Mar 19, 11:59pm **

## Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-service-calls' (`git checkout -b js-service-calls`)
* Add and Modify the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  

## Goals and Expectations

You will create a single page application that allows users to
- Login
- Logout
- While logged in:
  - See their personal stored word
  - Change their personal stored word

This is similar to the "express-login" assignment
- Except static HTML files instead of server-generated HTML
- Using client-side JS 
- Using service calls
- NO REDIRECTS

Key lessons include:
- Making service calls
  - Instead of navigating to new server-based pages
- Sending JSON data in the body
  - Hint: including data
- Performing login/logout with service calls
- Using service status codes
- Parsing and using service data from body

You will be writing:
- **static** html (just one page!)
  - The HTML will be changed by the front end JS, but the server-side is static HTML
- **static** css
- client-side JS
  - Using webpack and babel, as with the js-cart assignment

You will not modify any js files loaded directly or indirectly by server.js, including server.js itself
- But you do need to create a package.json, install the necessary packages, and create the necessary config files to let the provided server run as required

You will use webpack and babel (both!) to
- build (transpile and bundle) the client-side JS bundle

Your code will be runnable (and will run the expected commands) using
- `npm install`
- `npm run build`
- `npm start` or `npm run start` (they are the same)
- Visiting `http://localhost:3000/`

## Different Content Views and Moments

All of these "views" are changed HTML content of the initial HTML page loaded from the server, with the HTML being changed by client-side JS reacting to data from web service calls.  There is only a single, static HTML file and no server-generated HTML.

### Page Load

When the page loads, JS code will check for an existing session (the GET /api/session call in Resources)
- If there is a session, JS code will get the existing stored word (the GET /api/word call in Resources) and show the Word View
- If there is not an existing session, JS code will show the Login Page
  - "page" here meaning content, there is only one HTML page, and it is static
  - A user that is not logged in will get a 401 error from the service call
    - You should not show a special error message for this situation
    - Showing the login form IS how the user needs to deal with the problem
- This means that reloading the page 
  - Will NOT forget the stored word
  - Will NOT forget if you are logged in
  - WILL perform this initial page load logic again

### Login

Show a form requesting a username
- When submitted, this form will login (calling, NOT navigating to, the POST /api/session in Resources)
  - If successful, JS Code will show the Word View
  - If unsuccessful, JS Code will show an appropriate error message to the user ("dog" causes a different error than username of invalid characters)
    - "dog" simulates the user getting a password wrong
    - Show the user a "nice" error message that is NOT the error message the service returns 
      - But is BASED on the error message the service returns
      - Because the error message is the result of the render loop, you should have the error message in your state to show it
      - Remember to remove this error message after they successfully login!

### Word View

- Show the username
- Show an option to logout 
  - If the user logs out
    - Call the logout service (DELETE /api/session in Resources) (call, do not navigate to)
    - Once service call returns, show the user the Login view
- Show a form showing the stored word for this user and offering the option to update it
  - If the user updates the word
    - Call the replace word service (PUT /api/word in Resources) (call, do not navigate to)

### Visuals

The visual requirements are the same as `express-login` - You are welcome to use the same HTML/CSS from that assignment, but:
- Make sure you apply any corrections
  - From that assignment as reviewed by TA
  - Any discussed in class
  - Any covered by the requirements that may not have been called out on the previous assignment
- Translate the format as needed
  - This assignment is using a base static HTML file + front-end generated HTML, not backend-generated HTML

You must show effort to make it visually attractive and usable
- Make different areas of content visually distinct using colors and/or spacing
- Make content legible using whitespace (padding, margin, line-height, etc)
- Interactions (form fields, buttons, links) must have text/labels to be understood by an uninformed user
- Context (additional text/headings) should make it clear what content is being displayed
- The content should be responsive (text flow to fit) the page at desktop sizes 
  - Avoid fixed sizes on structural elements (those elements that would prevent responsive behavior)
  - Enforced reasonable visual gutters to keep content to a maximum width is allowed but not required

## Resources

This `server.js` offers these urls to use for service calls with the listed HTTP Methods.  You will need to figure out which endpoints you call, and when to call them.

### GET `/api/session`

Checks to see if the user is logged in 
- If yes, returns JSON of object with `username` property
- If no, returns 401 status 
  - This is not an error to report to user, but is used by the code to decide if a user is or is not already logged in

### POST `/api/session`

- Expects body to be JSON of object with a username property

Checks submitted username
- if is "dog", returns 403 status and JSON of object with error property "auth-insufficient"
- if invalid (not alphanumeric or is empty), returns 400 status and JSON of object with error property "required-username"
- if valid, sets the `sid` cookie and returns a JSON of object with username property

### DELETE `/api/session`

Performs a logout, removing the `sid` cookie and deleting any matching session on server

Always returns JSON of object with `wasLoggedIn` boolean property
- This return value isn't very useful, but you have to do it anyway because your instructor is mean

### GET `/api/word`

Returns JSON of object with username and storedWord properties
- If not logged in, instead returns status 401 and JSON of object with error property of "auth-missing"

### PUT `/api/word`

- Expects body to be JSON of object with a "word" property
Returns JSON of object with username and storedWord properties
- For this assignment, an empty string (`""`) IS a valid word to store
  - This means you will NOT have any error to display about a missing word
  - A missing word error happens if the request doesn't even have a "word" parameter, which your front end should never do, even if the value is ""
- If not logged in, instead returns status 401 and JSON of object with error property of "auth-missing"

## Hints
- Start by writing a basic render method. This will tell you what variables you need in your state.  Then add event listeners and service calls to update the state and handle events from elements you have rendered.  
- Write a little bit of functionality at a time and make sure it works before adding more functionality.
- Don't forget to add a check for existing session when the page loads, but that should be written only after you have the basic functionality of rendering based on state working.
- You will want to make use of event delegation to attach event listeners to ancestor elements that are not replaced, and check the event.target to see if the target was a specific element.  This will let you add event listeners for elements that may not be on the page yet or that are commonly replaced by your render method.
- Don't forget to show error messages to the user in the text of the page. `console.log`/`console.warn` are NOT error handling!
- Not all service errors are errors you need to display to the user.  For example, when you check for an existing session, you will get back a rejected promise if there is no session, but that is an expected result and not a problem, so no error is shown to the user.

## Additional Restrictions
- Do not use `async` or `await` while learning promises
* You should use the node/npm modules used in class ONLY
* Do not use any other outside JS or CSS files or other assets
  - Exception: You may use SVG/PNG icons from https://fonts.google.com/icons IF you keep a `licenses.txt` file in your repo (same folder as this README) that lists each image filename you have and for each filename you say "from https://fonts.google.com/icons using the Apache 2.0 License"
* Use Semantic HTML and semantic CSS class names
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts for anything other than tables of data
* Do not use `alert`, `prompt`, `confirm` or other blocking JS
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS
* Follow the best practices as described in this course to date

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
- Your code runs (with or without correct details) when invoked using `npm install`; `npm run build`; `npm start`
  - This requires that you create the necessary script entries in package.json as shown in class
- The changing HTML of your application is not generated by or saved to the server
- You do not use client-side storage such as cookies, localStorage, storing info in the URL, etc, except for any `sid` cookie that stores the session id.
- You are using a single HTML page
- You hide/show content by using Conditional Rendering (meaning the HTML has/does not have the text), not by hiding content using CSS
- You are building your front end JS using webpack/babel as shown in class
  - Do not google/search a solution, you may not get the process used in class
- You have an earnest attempt at using a MVC breakdown for your client-side JS (one requirement)
  - A distinct state and ways to change that state (model)
  - A way to generate/replace HTML that is based on state alone (view/render)
  - Code that attaches listeners to react to actions, update the state, and calls the view 
  - The Critical requirement is only that you do so enough to get essential practice.  Having errors while doing so is covered as Additional Requirements
- PR does not contain changes to files unrelated to the assignment
  - a root `.gitignore` file IS related and may be included
- Your JS event handlers are loaded using addEventListener()
- Do not use inline styles (one requirement)
  - Do not use `style` attributes
  - Do not use `style` properties
  - Do not write `<style>` elements
- You obeyed each of the listed "Do not" under "Restrictions"

### Additional Requirements
- Did you create a correct and usable package.json file?
- Did you create a correct and usable configuration based on the material from class?
- Did you install ONLY permitted and appropriate modules?
- Did you create the expected scripts in package.json?
- Do the scripts correctly create the necessary files when the steps listed at the of Goals are followed?
- Did you follow the restriction against modifying server JS content?
- Each form field is properly associated with a text label
    - Quick test: click on the text of the label, the field should be selected
- Your PR has the correct branch name and follows other course expectations for a PR
- Your commit message should be a single sentence that completes the phrase "these changes _______" 
  - Without including the words "these changes"
- Your commit message makes sense if someone reading it doesn't know what assignment it is part of
- You removed/updated any comments that no longer apply to your files
- You followed the MVC practices shown in class
  - The exact files, file names, and details can vary as long as you are following an MVC breakdown
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
- Would a user understand what to do on each page?
- If a user logs in and reloads the page, does it end up showing the same content?
- Do event handlers/service calls change state instead of directly changing HTML?
- Is any derived state kept out of state itself and recalculated as needed?
- Does the front end code store data only about the currently logged in user?
- Are you changing the apparent "Page" for the user based on JS state?
- Are the correct service calls made when needed by requirements?
- Are error message for the user made visible to the user in the HTML?
- Are responses checked for when they report an error from the service?
- Do service calls notice and report to the user any network issues correctly?
- Are you sending and receiving JSON data?
- Are you using correct headers when sending the data?
- Do you change state based on data from service calls?
- Do you understand what the code you are submitting does well enough to explain to your team?
- If you attend my course on Wed, include the comment text "generated" at the top of your .js file

