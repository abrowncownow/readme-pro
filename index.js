#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import fs from 'fs';
import generateMarkdown from './generateMarkdown.js';

var data;
var readMe;
var name;

//Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
//Declare Functions

const sleep = (ms = 2000) => new Promise ((r)=> setTimeout(r,ms))

async function askName(){
    const answers = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Steve';
        },
    })
    name = answers.name;
}

async function welcome() {
    const rainbowWelcome = chalkAnimation.rainbow(
        `${name}, Welcome to the ReadMe Gen Pro 9000! \n`
    );

    await sleep();
    rainbowWelcome.stop();

    console.log(`
        ${chalk.bgBlue('How to use this tool:')}
        Answer the questions regarding your project.
        I will digest all of your weak answers.
        I will then poop out a beautiful readeMe.md file for you to plagiarize.
    `)
}



function getData() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the title of your project?",
                name: "title",
            },
            {
                type: "input",
                message: "Write a description here:",
                name: "description",
            },
            {
                type: "input",
                message: "What is your favorite hobby?",
                name: "installation",
            },
            {
                type: "input",
                message: "What is your LinkedIn username?",
                name: "usage",
            },
            {
                type: "list",
                message: "Choose a license",
                choices: ["none", "MIT", "Something Else"],
                name: "license",
            },
            {
                type: "input",
                message: "What is your LinkedIn username?",
                name: "tests",
            },
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "questions",
            },
        ])
        .then((answers) => {
            data = answers;
            console.log(data);
            handleAnswer();
        });
}

async function handleAnswer(){
    const spinner = createSpinner('Beep. Boop.. Processing...').start();
    await sleep();
    readMe = generateMarkdown(data);
    spinner.success({ text: `Good job me!`});
    await sleep();
    await winner();
}
async function winner(){
    console.clear();
    const msg = `Congrats, ${name}!\nYou made a Pro ReadMe!`;
    figlet(msg, (err,data) => {
        console.log(gradient.pastel.multiline(data));
    });
    await sleep();
    console.log(readMe);
}
function init(){
      
}
//declare functions

//Readme 

//init
await askName();
await welcome();
await getData();