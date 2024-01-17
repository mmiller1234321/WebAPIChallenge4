# 04 Web APIs: Code Quiz

## Your Task

At some point in your journey to become a full-stack web developer, you’ll likely be asked to complete a coding assessment&mdash;perhaps as part of an interview process. A typical coding assessment includes both multiple-choice questions and interactive coding challenges. 

To help familiarize you with these tests and allow you to use the skills covered in this module, this Challenge invites you to build a timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface. 

This week’s coursework will equip you with all the skills you need to succeed in this assignment.

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Mock-Up

The following animation demonstrates the application functionality:

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.](C:\Users\senat\bootcamp\NU-VIRT-FSF-PT-12-2023-U-LOLC-1\04-Web-APIs\02-Challenge\Assets\04-web-apis-homework-demo.gif)

##  Process

Created HTML file for main page and high scores
Created Javascript file for main page and high scores page
Set up CSS for buttons
Adjusted window size to fit different devices

CSS File

```
- Set dark theme for quiz
- Set font for quiz
- Provided interactive CSS for buttons
- Utilized media screen to fit any device's viewport
```
Specific functions in JavaScript file

```
- Variable listing all prompt, options, and answer
- Get elements from DOM (questions, timer, options, submit button, start button, restart button, name and feedback)
- Variable setting quiz's initial state
- Function starting uqiz
- Function looping through array of question and answers and create list with buttons
- Function checking for right answers and deduct time for wrong answer, proceed to next question
- Function ending quiz, stop timer and show final score
- Function ending quiz if timer reaches 0 
- Function saving score in local storage along with users' name
```

Specific functions in Highscore JavaScript file

```
- Get score button element from DOM 
- Rank previous scores in order by retrieving scores from localStorage
- Clear previous scores when users click clear

