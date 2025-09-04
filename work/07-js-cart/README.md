# JS Shopping Cart

Due by **Wed Feb 26, 11:59pm **

## Submission Instructions
* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-cart' (`git checkout -b js-cart`)
* Add and Modify the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  

## Goals and Expectations

You will create a single page application that allows a user to:
- See a Product Page of 3 cats each with a name and price
- Click a "Add to Cart" button for each cat
- Click a "View Cart" button 

While viewing the cart they will see
- The Product Page content is STILL shown
  - The View Cart content is ALSO shown
  - The "View Cart" button is NOT shown
  - A "Hide Cart" button IS shown
- The cat, name, quantity, and total for any cats they added
- They can update the quantity for any cat in the cart
- A "Checkout" button 
  - Checking out will remove all the cats from the Cart
  - Checking out will Hide the Cart content

You will use webpack and babel (both!) to
- build (transpile and bundle) the client-side JS bundle

You will have an express server configured to 
- serve static pages only (no dynamic HTML, no login, no redirects)
- Your front end JS code WILL create dynamic HTML, but the server will not

Your code will be runnable (and will run the expected commands) using
- `npm install`
- `npm run build`
- `npm start` or `npm run start` (they are the same)
- Visiting `http://localhost:3000/`

### General Practice
- You should demonstrate the skills shown in class
  - "Working" code using techniques from outside of class does not demonstrate the skills from class
- You will use the concepts of separate state and rendering from class
- Do NOT add event listeners to dynamically generated elements
  - Hint: Like how in class we used Event Propagation so we added event listeners to elements that were in our index.html, not to elements that were created in render()
- Your client-side JS should involve at least 2 JS files in `src/` that are used wisely to improve the findability of your JS code (one JS file will `import` values from at least one other JS file)
    - Hint: Separate out "model" code with state and ways to change state from "view" code that updates HTML and from "controller" code such as setting up events and calling the model functions and render functions.
- We are using prices, but use Numbers and Strings, no need to worry about extreme precision with the simple math we are doing

### Server
- You will create a `server.js`
  - Running express
  - Configured to server static files from `public/`
- `npm start` or `npm run start` will run `node server.js`
  - Hint: NOT using `node --watch` or `webpack-dev-server`
- There is no persistence/storage for this project, so hitting "refresh"/"reload" in the browser will reset the page to the initial (no cart contents) page.  That's expected and fine for this assignment.

### Build
- You will use Webpack and babel configured as per class
  - Hint: Follow the slides that involve babel-loader and webpack.config.js but NOT babel.config.js
- Your development js will be in a `src/` directory
  - Outputting built js to `public/`
- You must define `start` and `build` scripts in your `package.json`
  - You can define other scripts to do things like run `webpack-dev-server`, `node --watch server.js` or `npx webpack --watch` for your own convenience, but these will not be considered for or against your grade

### Product Page
- The Product Page displays by default on `/`
- The Product page will list 3 cats (use the below image urls)
  - http://placehold.co/150x150?text=Jorts ($0.99 each)
  - http://placehold.co/150x150?text=Jean ($3.14 each)
  - http://placehold.co/150x150?text=Nyancat ($2.73 each)
- While this currently has 3 cats("products"), your code should use data structures and assume the list of products could be changed in the future 
- Include the price in the "listing" for a given cat
- Give each cat pic a "name" as the product name
    - Match the text in the image
- Each cat listing will have an "Add to Cart" button
  - Clicking "Add to Cart" will add 1 to the quantity of that cat in the cart
    - Or set the quantity to 1 if the cat was not in the cart
- If the "View Cart" content is not displayed, there will be a "View Cart" button
  - The View Cart button will include a number of total items (sum of all quantities) in the cart if that number is greater than 0
    - Note: Sum of quantities!  Even with only 3 "products", the total items can exceed 3
    - You can decide how to show this, but "View Cart (5)" text is adequate
  - Clicking the View Cart button will 
    - No longer show the View Cart button
    - Show the View Cart content
    - Continue showing the Product Page content
- You have discretion on how to handle the visuals, subject to the Visual requirements below
    - Hint: Because the Product Page content is **always shown**, think of the "Cart Content" as part of the Product Page content, not a separate page

### View Cart
- While all of the below currently uses the 3 cat "products", it should be able to easily handle added/removed/changed "products"
  - Hint: You should have separate "product data" and "cart data"
  - Hint: I recommend NOT putting all details of a product into the cart.  Cart data can hold an identifier for the product and a quantity for that product, while Product data has the image and price but not the quantity.
- The View Cart content will display the cats added
  - If there are no cats, show a message "Nothing in the cart"
  - Including the name and pic of the cat
  - Including a quantity per cat (as long as that quantity is greater than 0)
    - The quantity can be edited (You choose exactly how)
    - On edit related values and visuals will update
  - Cats at quantity 0 are not shown
  - Including the total price for that cat (price per cat * quantity)
    - This must be to two decimal places
      - Hint: google "MDN toFixed"
  - And a total price for the Cart (sum of total prices for all cats)
    - This must be to two decimal places
- The total cost of all cats in the cart is shown
- You can use different numbers in the paths to get images of different sizes (example: http://placehold.com/50/50?text=Jorts) in the View Cart content, if you wish
- When displayed, the View Cart content will have a "Hide Cart" button
  - Clicking the Hide Cart button will
    - No longer show the View Cart content
    - Will show the View Cart button
- When displayed, the View Cart content will have a "Checkout" button
  - Clicking the Checkout button will
    - No longer show the View Cart content (as if "Hide Cart" was pressed)
    - Remove any items from the cart
    - Update any related values displayed in the HTML (such as the count in the View Cart button)

### Visuals
- Styling this content well would be an interesting exercise but beyond the purpose of this assignment
- Therefore the visual requirements are minimal
- Related areas of content must be clear
  - Example: It is obvious which name and price is related to which cat
- The View Cart content must be a visually distinct area from the Product Page content
  - Example: A different background color

## Additional Restrictions
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
- You do not use client-side storage such as cookies, localStorage, storing info in the URL, etc.
- You are using a single HTML page
- You hide/show content by using Conditional Rendering (meaning the HTML has/does not have the text), not by hiding content using CSS
- You are building your front end JS as using webpack/babel as shown in class
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
- Does the code/page easily work with new/changed products?
- Is Cart data separate from Product data, and do each cover their respective details?
- The product page shows the cats as requested
- Cats can be added to the cart as requested
- The View Cart button shows the cart quantity as requested (multiple requirements)
- The View Cart/Hide Cart button works as described
  - Hint: The "Cart" is not a separate "page" of content, it is additional content shown alongside the Products.  You will have to figure out how to do this based on the lessons from class as I didn't show that exact case.
- The Cart Contents are shown as requested (multiple requirements)
- Cart Quantity can be changed as described
- Checkout works as described
- Add to Cart works as described
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
