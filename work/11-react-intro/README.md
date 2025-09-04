# Assignment: React Intro

**Due by Wed Apr 2, 11:59pm **

## Submission Instructions
* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-intro' (`git checkout -b react-intro`)
* Create a react application in this directory using Vite
* Create and modify the files in `src/` of the created project folder to fulfill the requirements below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  


## Goals

- Create a React application that is made up of multiple components
- Demonstrate an understanding of the `useState` hook
- Demonstrate an understanding of passing props, including handlers/setters to components
- Demonstrate an understanding of gathering input into state as it is entered
- Demonstrate an understanding of how to conditionally render content
- Be able to import non-React JS and use it inside a component
- Demonstrate an understanding of applying CSS to React components
- All skills in this assignment are building the client side

## Assignment Goals and Expectations
- This application will test front-end code only
  - Nothing is sent to a service
  - No backend calculation is done
  - Refreshing the page will wipe all front end state and start over
- The application will ask a user to login, showing an input field for the username and a button
  - A username is allowlisted in the frontend code
    - Remember what "allowlisted" means
  - An invalid username will be shown a message that the username is not made up of valid characters
  - username "dog" will be shown a message saying they are not a valid user
- The application will ask the logged in user to input a 5 letter word and show an input field and a button
- A logged in user can log out
- When the form with this word is submitted, the page will clear the input field AND display one of three messages:
  - If the input did not contain a 5 character word, the page will add the message "XXX was not a valid word", where XXX is what was in the input field
  - If the input did contain a 5 character word, but it was not the secret word, the page will say "XXX had N letters in common", where XXX is what was in the input field, and N is the number of letters in common with the secret word, using the same concepts from the compare code from section 1
  - If the input did contain a 5 character word, and it was identical (regardless of case) to the secret word, the page will say "XXX is the secret word!"
- Your code to compare letters between two words will be in a .js file and the function will be imported into a component
  - Hint: This code will have to use import/export syntax instead of require, so you will have to change your compare function from earlier
  - Hint: make sure you are importing the compare function from a .js file into a .jsx file
- The secret word is "RECAT" - just hardcode this to a variable
  - The secret word does not change in this assignment - there is no list of allowed words
  - Yes, "RECAT" - it's a cat/react joke
- Your application can be tested by entering the created directory and running `npm install` and `npm run dev`
### Structure
- The App component should load and conditionally render a Login component and a Game component
  - The App component should pass any necessary handler functions and/or setters to the Login and Game components
- The Login component handles the login form
- The Game component handles the form to make guesses
- These components may import and use other components as you wish
### Visuals
- Remember to remove/replace the default CSS provided by Vite
  - Both App.css AND index.css
- Apply CSS to your components
  - Remember to use "className" instead of "class"
  - Remember to use lowercase classnames, not MixedCase, nor MixedCase-with-hyphens
- Make your application reasonably attractive
- Include enough space around items
- Have elements reasonably aligned
- This app does not have a lot of visuals, so make sure you do enough to show you understand
  - Hint: This means if you have not applied any meaningful styling beyond the default provided, you have NOT shown an understanding.  It does not have to be complex, but it does have to prove you can do it. 

## Restrictions
- Use only the libraries/packages installed by Vite and shown in class
- No server-side code
- All components must be .jsx files named in MixedCase
- Components should have good separation of concerns
  - not too large
  - not doing too much
  - same logic as splitting up functions
- Components should have good, accurate, meaningful names
- state values should have good, accurate, meaningful names
- Component filenames should match the component name
- Components must each be in a single file with no other exported values
- Logic that is not about JSX should be imported from .js files
- .js files and functions should have good, accurate, meaningful names

## Additional Expectations
- Do not use `document.querySelector()` or otherwise query or set the DOM directly outside of reading elements from event targets
- Do not use `useRef`, or `ref` props from React (If you do not know what I mean, that is fine)
- Follow the best practices described in class
- Use Semantic HTML as much as you can
- Follow any suggestions previously given to you in code reviews
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
  - Vite creates a .gitignore file that should handle the `node_modules/` file
  - Vite installs sample files in addition to required files.  Make sure you don't include sample files that you aren't using
    - `index.html` and `src/main.jsx` are required
    - `src/App.jsx` and other `.jsx`/`.css` files must be modified/replaced/deleted as appropriate
    - The images used in the example code should be removed
      - The vite.svg may remain
- Do not use external CSS libraries
- Do not use floats to do more than manage flowing text with images
- Do not use HTML tables unless displaying a table of data
- Do not use CSS table layouts
- Do not use CSS preprocessors, minifiers, or other tools to modify your CSS
  - I and the TA(s) must be able to read it easily

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
- Your code runs (with or without correct details) when invoked using `npm install`; `npm run build`; `npx serve dist`
- The changing HTML of your application is not generated by or saved to the server
- You do not use client-side storage such as cookies, localStorage, storing info in the URL, etc
- You are using a single HTML page
- You hide/show content by using Conditional Rendering (meaning the HTML has/does not have the text), not by hiding content using CSS
- You are building your front end JS using Vite/React as shown in class
  - Do not google/search a solution, you may not get the process used in class
- PR does not contain changes to files unrelated to the assignment
  - a root `.gitignore` file IS related and may be included
- Do not use inline styles (one requirement)
  - Do not use `style` attributes
  - Do not use `style` properties
  - Do not write `<style>` elements
- You obeyed each of the listed "Do not" under "Restrictions"

### Additional Requirements

- Does the app work overall and meet all requirements not covered by other criteria?
- Were all restrictions not covered by other criteria followed?
- Does the code demonstrated the requested skills and lessons?
- Do forms behave (by click or Enter in input fields) as expected for app?
- Is non-React, non-UI logic moved out of `.jsx` files into `.js` files?
- Does the breakdown of files make it easy to find particular content?
- Are separate files largely decoupled except for parameters and return values?
- Is it easy for a dev new to the code to understand how it works enough to make a change?
- Is it easy for a dev to find the section of code that controls a specific part of the app?
- Is it easy for a dev to understand what any given section of the code is about without reading every line?
- Is any derived state kept out of state itself and recalculated as needed?
- Is the JS/JSX following the best practices given in the course?
- Are functions and variables named meaningfully?
- Are functions doing too many different things?
- Is code visually broken up into "paragraphs" with different purposes?
- Are any comments helpful?  Not just repeating what the code says, and providing context or reasoning?
- Is code indented and formatted consistently and according to the best practices provided in the course?
- Do you understand what the code you are submitting does well enough to explain to your team?
- Is the HTML complete and valid?
- Are any form fields properly associated with a text label?
    - Quick test: click on the text of the label, the field should be selected
- Are the HTML and CSS formatted and indented per the standards given in the course?
- Does the content work at various reasonable "desktop" sizes of a browser window?
- Are HTML elements used in semantically appropriate ways?
- Are Semantic HTML elements used when available and appropriate?
    - And elements are not used for their default appearances when not semantically appropriate
    - Example: Don't use `<br>` or `<p>` just for space, don't use `<h3>` just for bolding and size
- Are all class names semantic and kebab-case (or BEM) style?
- Are any section headings (h1-h6) subheadings of previous headings
    - With no levels skipped?
    - And representing actual headings/subheadings, not used only for their appearance


