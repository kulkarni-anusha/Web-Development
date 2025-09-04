# Assignment - Basic Express

Due by **Wed Feb 5, 11:59pm **

## Submission Instructions

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-express' (`git checkout -b basic-express`)
* Modify the files in this directory to have the required features
* Add any files required 
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s)  

## Goal and Expectations

You will write a group chat website using NodeJS and Express
- We must be able your code with `npm install` and then `node server.js`
  - Run from the directory this README.md is in
  - To enable this, following the processes from class
    - You must create a `package.json`
    - You must add the expressjs dependency by installing that library
- You are provided a partial implementation
  - You must complete it by filling in the missing pieces
    - You may make changes to the provided code except where the comments say otherwise
  -  You must remove/update any comments from the code that don't apply after your changes
    - Comments should always reflect the current state of the code
    - Unclear/out-of-date comments are misleading and harmful
- The app will show all messages and who sent each (username and avatar image)
- The app accepts the username sending a message as part of the incoming data
  - This is unsafe, and we will learn better security practices next week
- `http://localhost:3000/` will DYNAMICALLY return the html for the page
- Include any prompts used to generate code as a comment in the generated code
- The CSS will be loaded as a STATIC asset (hint: you'll have to provide the static file AND make sure it is loaded by the dynamically generated HTML)
- The styling must make the web page easy to understand and use
  - You must show you can create a basic layout (arrange elements), set visually distinct areas, and whitespace
- The app will display a visual list of "logged in users"
  - We will not yet have an option to log in
  - This list is based on an **object** of known users that will not change (is "hardcoded")
    - For this assignment, you may assume all messages come from one of these users
      - That is, all known users are also logged in users
      - This assumption will not be true for future assignments
  - There is no requirement for the shown order of the names
- You may change the pre-defined names and messages
  - You must have a `users` object with multiple usernames predefined
  - You must have an `messages` array predefined with multiple messages
  - You must have predefined messages from more than one user
- The HTML will display all of the messages that have been sent, including new ones
  - You must display the avatar images of users that have one
  - You must display a "default" avatar image of your choice for messages from a username that doesn't have a specific avatar image
- Include the first 5 words of the first prompt used to generate code as a comment in the generated code
* The HTML must contain a form to submit as POST(method) to `/chat` (action)
  * The form must contain a `<select>` dropdown to set the `username` field
    - This list must automatically include all the names from the "logged in users" list
      - The server must accept use whatever username is sent in this field as the sending user
        - This is not a secure way to determine username
        - This is temporary until we learn about logins and sessions
  * The form must contain a field with the `name` attribute value of `text`
    - This is the message the user wants to send
- The server-side JS will handle this request ( fill in the `app.post()` from the included code)
  - The server will add the new message to the array of messages
  - The server will respond with a redirect to `/` 
    - See included code, watch what happens in your network tab in the browser

## Allowances
- You may (and are encouraged to) write the generated HTML as you see fit
  - You must follow the required features listed here and in the provided comments
  - Your HTML must be semantically valid and follow best practices from class
  - You may consult and be similar to any previously provided HTML
  - You must not copy or start from those previous files or parts of those files
    - Create/recreate any HTML yourself
- You may apply CSS as you see fit
  - You must follow the best practices given in class
  - You may consult and be similar to any previously provided HTML
  - You must not copy or start from those previous files or parts of those files
    - Create/recreate any HTML yourself
- I have provided an example base HTML and CSS file in `sample/`
  - A _minimal_ example.  You are encouraged to do more.
  - Do not just copy the files and change them
  - These examples do NOT meet all of the requirements
* Formatting dates and times is a nightmare in any language, so we have skipped timestamps
  - But learning/formatting timestamps is a good thing to look into for your future
* You may add additional JS files (server-side ONLY) that you write

## Restrictions
* You MUST follow the required/best practices outlined in class
* You must use the correct HTTP methods (GET for loading pages, POST for adding content) as listed
* You must use the route paths as given/described
    * `/`
    * `/chat`
* Do NOT have any "password"/login behavior
    * Poor security is BAD security - we will not even pretend to have security yet
* Do NOT add extra routes beyond those described above
* Do NOT change how the routes get/pass data except as described here
* Do NOT load any HTML using static routes
* Do NOT use external JS other than express itself
  - You may use existing JS modules that do not require installation (such as `path`)
  - You may not use client-side (browser) JS.  Only server-side.
  - You may install more libraries than express for this assignment
* Do NOT use external CSS libraries
* Do NOT use meta-tag redirects
* Do NOT use Map() or Set()
  - As before, nothing wrong with Map() or Set(), but I want you to practice using plain JS objects first
    - If you feel the need to have map/set-like behavior
  - Note: .map() on arrays is a different thing than the Map data structure you get from Map().  You are both allowed and encouraged to use .map() on arrays for assignments.
* Do NOT use external CSS libraries, only CSS you are writing yourself and included in this PR
* Do NOT use meta-tag redirects
* Do NOT use floats to do more than manage flowing text with images
* Do NOT use HTML tables or CSS table layouts to layout elements on the page
* Do NOT use client-side/browser-side Javascript
* Do NOT use CSS preprocessors, minifiers, or other tools to modify your CSS
  * Reviewers must be able to read your work easily

## Grading 

Note: The assignment is to show your understanding of the material from class.  If you don't show your understanding of class material, you can lose points, even if your assignment "works".  

**Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).**

This assignment is graded as a base of 100 points
- Each Critical Requirement you miss is a minimum of -10 of the assignment grade, and may lose more
- Each Additional Requirement you miss is -2 of the assignment grade.  There may be MANY non-critical requirements, and they add up!
- If you are not showing the lessons from class, your grade will be worse or even given a 0. Each week builds on the material from the previous week so it is important that you learn and practice the lessons from class.

### Critical Requirements
- Your submission demonstrates that you practiced the overall purpose of the assignment
- You create a PR with your code for this assignment roughly following the course process
- Your code runs (with or without correct answers) when invoked as with `node` as described
- PR does not contain changes to files unrelated to the assignment
  - a root `.gitignore` file IS related and may be included
- You obeyed each of the listed "Do not" under "Restrictions"
- Do not use `style` attributes
- Do not write `<style>` elements

### Additional Requirements
- Your PR has the correct branch name and follows other course expectations for a PR
- Your commit message should be a single sentence that completes the phrase "these changes _______"
- Your commit message makes sense if someone reading it doesn't know what assignment it is part of
- You removed/updated any comments that no longer apply to your files
- You created a correct `package.json` as required
- You followed the MVC practice shown in class and demonstrated by the provided files
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
- Any other detail mentioned in class or the instructions may be an Additional Requirement

