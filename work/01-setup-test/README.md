# Assignment - Testing node and git

**Due: Wed Jan 15, 11:59pm ** 

EXCEPTION: If you joined the class after the first week, you will need to complete this assignment but the due date is Wed Jan 22, 11:59pm , same as the second assignment.  I highly encourage you complete this assignment as soon as possible, and as a courtesy to the TA, mention in the PR description that you joined the class late.

## Goal
This assignment confirms:
- You have NodeJS installed on your machine
- You can run code I provide using NodeJS
- You have git installed on your machine
- Your repo is properly connected to your class repo on GitHub
- You understand how to submit assignments using git and GitHub

## Instructions

This is lengthy to make the pattern for future assignments clear. If anything is unclear, you should ask questions in Slack or in Office Hours with myself and/or TAs.

NOTE: This assumes you have followed all of the instructions from the "setup-for-this-class" document at the base of this repo.  Do that first.

From this directory, at the command line:

1.  Run `npm install`
  - Make sure you run this command while "in" the same directory as this file
    - MAKE SURE YOU UNDERSTAND THIS.  If the `pwd` command doesn't end in `/01-setup-test/` you are not "in" the correct directory
  - You should see some text while it downloads a library or two
  - If you see a permission error (EACCES) you probably installed something as root/administrator, and now your normal user account can't override it. That's a bit messy to clean up, but it's doable and you want to clean that up NOW rather than later in the semester.
    - Lots of ways of addressing this exist, with varying levels of success and computer security.  Speak up on Slack if this is an issue for you.
  - You only need to run `npm install` successfully once for this assignment.  Once the dependencies are installed, you can run the program (see below) as much as needed without reinstalling.  Reinstalling is only necessary if the dependencies are changed.
2.  Run `node list.js` (also "in" this directory)
  - You should see some names printed to the console
3. You are going to make changes, so you should first create a "feature branch" to create those changes in
  - run `git checkout -b setup-test`
  - This branch name, "setup-test", is specific to this assignment.  Each assignment will be done in its own branch with a unique name.
  - Notice that branch name is NOT based on directory/folder names.  The branch name is just a "label" for a collection of changed files.
4. Edit list.js and add your Name (as it appears in Canvas), NEU ID, email, Slack Display Name (with an `@`), and github username to the list
    - "Add" means it is fine for my name and info to remain there
  - Make sure you match the upper/lower case for these fields, some (like github username) are case-sensitive
  - Your "Display Name" in Slack will start with an `@` - you can type `@` in Slack and start typing the rest of your name and you should see it as an autocomplete option
  - We (Instructor and TAs) will use this information to connect your accounts and to contact you in case of problems, so it is important that your information be accurate. For example, use the "name" that we see in Canvas.  Your Slack and GitHub usernames can be whatever you prefer for this course, they do not need to contain your NEUID or your name, though you are responsible for using this assignment to make sure we know how to connect them.
5. Run `node list.js` again now that you've saved your changes
  - You should see your name added to the list that outputs
  - Everything should run smoothly
  - Fix any errors that do turn up and repeat this step until everything runs smoothly
6. Add the file to the list of files to commit: `git add list.js`
  - The path to `list.js` in that command will depend on where you run the command. 
    - For example, running the command at the root of the repository would be `git add work/01-setup-test/list.js`.
7. Run `git status` and make sure nothing is listed as an 'Untracked file' and only `list.js` is listed to be added. (a `.gitignore` file is also allowed to be added, see below)
  - I have never heard *anyone* say "I run git status too much".  It is much easier to clean up a commit BEFORE you make it, so always run git status before doing a commit.  Always pay attention to the output of git status.  Multiple students forget this step each semester.
  - If you DO have other files listed (such as `.DS_Store` or `.idea`) listed as Untracked files, you should create a `.gitignore` file AT THE ROOT OF THE REPOSITORY (same folder that has "syllabus.md" and "do-not-copy-work.md" in it), since you will want to skip those same files in other assignments.  You will have to `git add` the `.gitignore` file as well (with the appropriate path to that file in the `git add` command)
    - More info about the syntax of the .gitignore file: https://www.atlassian.com/git/tutorials/saving-changes/gitignore
    - You can examine the `work/.gitignore` file or the `work/01-setup-test/.gitignore` files to see examples
        - Please don't edit files that have as their first line "Please don't edit this file".
        - Repeat for those that missed it: Don't edit files that have contents that say "Please don't edit this file"
  - If you have git troubles, I recommend consulting the list of common solutions at https://ohshitgit.com
8. Commit the file: `git commit -m "Adds MYNAME"` (Example: `git commit -m"Adds Lex"`
  - This commit message reflects your changes.  If you make other changes and have to commit those, and also when you commit other assignments, the commit messages should reflect THOSE changes, they should NOT say "Adds MYNAME".
  - Repeat: This assignment should have a commit message that has your name, not the literal text "MYNAME"
  - Repeat: Future assignments should NOT have commit messages that say "Adds MYNAME" (the literal text OR your name), that is specific to this assignment
9. Send your changes to github: `git push origin setup-test` 
10. Go to the github page for this repository and create a Pull Request(PR), with 'main' on the left dropdown and your setup-test branch on the right dropdown.
  - Do NOT merge, you MUST create a Pull Request(PR).  Your repositories should be set so that you cannot merge to main without a Pull Request, but they are created without that requirement so there is a period of time where you can merge, but you shouldn't do it.  Learn how to create the PR, because that's how all assignments for the class will be turned in, and if you do it wrong, your grade could suffer.
  - When you go to create the PR, review the files listed as changed to make sure they contain only the changes you expect and unexpected files are not listed. This is a great skill to practice for the job!
  - Add myself and the TA to review the PR.  If you don't do this, we may not know your work is ready and you won't get credit for it.
11. If the changes look correct, Create the Pull Request.
  - If you created and added `.gitignore` (Which I recommend), that change should be listed as well as your changes to list.js
    - Make sure that you created a NEW `.gitignore` file and didn't edit an existing one
  - There should NOT be changes to other files.
  - Be sure to **add me and any TAs as Reviewer** on the PR.
    - "Reviewer", not "Assigned"
12. Remember to return the main branch!  `git checkout main`.  In this branch, your changes do not exist (not until they are approved, merged in, and you pull the updated main branch)

## Grading Rubric

Note: The assignment is to show your understanding of the material from class.  If you don't show your understanding of class material, you can lose points, even if your assignment "works".  

*Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).*

This assignment is graded as a base of 100 points
- Each Critical Requirement you miss is a minimum of -10% of the assignment grade, and may lose more
- Each Additional Requirement you miss is -2% of the assignment grade.  There may be MANY non-critical requirments, and they add up!
- If you are not showing the lessons from class, your grade will be worse or even given a 0. Each week builds on the material from the previous week so it is important that you learn and practice the lessons from class.

### Critical Requirements

- You create a PR following the described process
  - This MAY be different than other courses have done!
- The code runs without syntax errors
- PR contains the requested changes to the appropriate file
- PR does not contain files unrelated to the assignment
  - a root `.gitignore` file IS related and may be included
  - This requirement means you didn't `git add` any unrelated files.  It does NOT mean that you removed any existing files
- You did not edit a file that says "Please do not edit this file"
- You applied the required commit message (this assignment only!)
  - Future assignments will require you add a useful commit message of your choice
- Any other detail required to meet the core purpose of the assignment may be considered a Critical Requirement

### Additional Requirements

- PR is created using the correct branch name
- PR does not contain files that are related to the assignment but that should not be in the PR 
  - (Examples: `.DS_Store`, `.idea`, `.vscode`, etc
- The PR is created, not just the branch pushed
- Myself _and_ the TA(s) are added as Reviewers to the PR
- No one is an "Assignee" on the PR
- Each requested detail (name, github username, etc) must be accurate (each detail is a separate requirement)
- Do not reformat lines of code you are not editing
- Any other detail mentioned in class or the instructions may be an Additional Requirement

## After Submission

You're done!  Your Pull Request (PR) is listed on github, and nothing further is required from you at this point.
- Your local code will NOT show your changes, because you switched back to the "main" branch, which does not have your changes yet.
- When you add the Reviewers to the PR you are saying the code is ready to be graded
  - Do not create the PR if you intend to make additional changes
- Canvas will NOT automatically update to show your submission - it is unaware of what is sent to github
- Grading is a manual process 
  - The TA(s) have 4 days after the due date to complete grading
- The TA(s) and/or myself may request explicit changes on your PR
- The TA(s) and/or myself will leave comments on your PR with advice to improve in the future
  - Make sure you are getting notifications from GitHub (and will notice them!)
  - This is practice for a job, where your peers will leave questions and suggestions on your Pull Request 
- Grades will appear in Canvas
- After grading, a TA/myself will merge your PR into into your "main" branch on Github
  - This is where our work is different than a "real" job: For most employers you are usually responsible for merging your code after it is approved, but for this class the TA/instructor will merge it after approval

## Making Changes

If you need to make changes in response to TA/Myself, or if you are making changes before the due date:
- You should NOT close the PR (unless it is completely the wrong code/branch)
- (if before due date) Remove everyone assigned as a Reviewer
- Switch back to the branch for this assignment in your local copy of the repo
- Make the necessary changes (make sure you are in the correct branch!)
- As you did previously: add the changed files, commit with a descriptive commit message, and push the branch to github ("origin")
  - The existing PR will update to show your new changes (the PR is a request to merge this branch on github into main on github, so once you update this branch on github the PR will include the updated changes)
- If you removed myself and the TA(s) as Reviewers, add us back
- Once again switch your local repo to the main branch so you are ready for the next assignment

Working with git can be a lot to learn all at once, but it is a common aspect of many programming-related jobs, and ensures that everyone can make tracked changes to a shared, approved common code base without accidentally overwriting each others' work or putting in incompatible changes.

