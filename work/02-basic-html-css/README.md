# Assignment - Basic HTML + CSS

**Due: Wed Jan 22, 11:59pm **

## Submission

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-html-css' (`git checkout -b basic-html-css`)
* Create/Modify the files needed to fulfill the requirements below.  Be sure to create the files in this directory (the one with this README.md)
* Add, commit, and push the branch to github
    - You pick the commit message, but it should summarize your work in this commit
    - Remember that your commit message is not just part of this assignment, it is part of the entire repo, so any messages specific to this assignment should be clearly about this assignment
    - Do NOT use "Adds MYNAME", that was the commit message for assignment 1 only
    - See [/readings/git/commit-messages.md](/readings/git/commit-messages.md) for more info on commit message
    - The push should be to this feature branch name (`git push origin basic-html-css`) 
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  

## Goal and Expectations

You will create a website consisting of two page and demonstrate an understanding of the basics of HTML and CSS following the practices taught in class.

You will create a website consisting of two web pages:
- the `index.html` file (Home page)
- a `privacy.html` file (Privacy policy)

You will modify the `index.html` file and create a `privacy.html` file along with any necessary files to fulfill the requirements below.

This website is visible by running `npx serve` in this directory, and visiting `http://localhost:3000/` in the browser.

These instructions will likely result is some **truly ugly** websites. That's okay, the goal at this stage is to understand how the parts interconnect. Just make sure the text is visible.

You may do more than is listed here, so long as you meet all the requirements listed in the way that is listed as required and use the skills shown in class.

### The home page (the index.html file)

Modify this file to:
- Load a separate `styles.css` file that you will have to create
- Load a `home.css` file that you will have to create
- Replace the contents of the `<main>` element to include an HTML unordered list of of your favorite animals. Each entry should contain a link to some web page on the internet related to that animal. These can be a category of animal (such as "owl") or to a specific individual animal (such as "Jorts the Cat")
- Replace the contents of the `<footer>` element to be a link to privacy.html, which you will have to create

### The Privacy Policy (the privacy.html file)

Create this file:
- This page should have the same header/footer as the home page
  - Yes, this means the privacy page will have a link to the privacy page (itself) in the footer.  This may seem odd, but is "normal".  See the Northeastern, Amazon, or Google privacy pages as an example: they all link to the very same privacy page in the footer.
- The contents of the page should be some fake text.  Do NOT copy text from some actual site.  Definitely do NOT copy HTML from some actual site.  The text does not have to be very believable, but should be words forming sentences.  Lorem Ipsum text is fine. 
- Somewhere in this text you should have a link back to the home page.  The link text should not say "click here" in any way but should be visible text that user understands is a link to the Home Page.
- The text should involve at least 2 paragraphs
- The page should load the same `styles.css` file as the `index.html` file (you will have to create the `styles.css` file)
- The page should load a `privacy.css` file that you will have to create

### styles.css

The CSS in this file should:
- Set the header/footer to have a different background color from the main page
- Set the main page background color (the background color of the html or body element) to something other than the browser default
- Set the page heading (the `<h1>` contents) to be shown NEXT to the logo cat pic, not above/below it, using flexbox
- Change any foreground colors needed to make the text visible for header/main/footer

### home.css

The CSS in this file should:
- Put a colored border and add padding (on all sides) around the entire list of animals
- Set the `list-style-type` CSS property for the list to "\1F431" (cat face)
- This file should use only classes as selectors, no element tags or ids

#### privacy.css

[Use the information about the first-letter pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter) to fulfill the below requirements.

The CSS in this file should:
- Set the first letter of each paragraph in the main content of this page to be `font-size: 150%;` 
- Set the `line-height` of the paragraph contents to `line-height: 1.6;`
    - This can be done directly or through inheritance, as long as the effective line-height for the paragraphs is the correct value

## Restrictions
* You MUST follow the required/best practices outlined in class
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
- Each Critical Requirement you miss is a minimum of -10% of the assignment grade, and may lose more
- Each Additional Requirement you miss is -2% of the assignment grade.  There may be MANY non-critical requirements, and they add up!
- If you are not showing the lessons from class, your grade will be worse or even given a 0. Each week builds on the material from the previous week so it is important that you learn and practice the lessons from class.

### Critical Requirements
- Your submission demonstrates that you practiced the overall purpose of the assignment
- You create a PR with your code for this assignment roughly following the course process
- The pages display using `npx serve` as described
- PR does not contain changes to files unrelated to the assignment
  - a root `.gitignore` file IS related and may be included
- You did not edit a file that says "Please do not edit this file"
- You did not have a commit message that says "Adds MYNAME" (literally or your actual name)
- You obeyed all of the listed "Do NOT" under "Restrictions"
- Do not use `style` attributes
- Do not write `<style>` elements

### Additional Requirements
- Your PR has the correct branch name and follows other course expectations for a PR
- Your commit message should be a single sentence that completes the phrase "these changes _______"
- Your commit message makes sense if someone reading it doesn't know what assignment it is part of
- You followed the specific requirements listed under "Goals and Expectations" (many separate requirements)
- Your styled page works for a variety of desktop sizes (you didn't expect a specific size, or restrict to an unreasonable desktop size)
- You followed the best practices listed in the course so far, including but not limited to (each a separate requirement):
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


