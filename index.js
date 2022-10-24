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
        message: 'What is your full name?',
        default() {
            return 'human-name';
        },
    })
    name = answers.name;
}

async function welcome() {
    const rainbowWelcome = chalkAnimation.rainbow(
        `${name}, Welcome to the Readme Gen Pro 9000! \n`
    );

    await sleep();
    rainbowWelcome.stop();

    console.log(`
        ${chalk.green.bgBlack.bold('How to use this tool:')}
        ${chalk.green.bgBlack('Answer the questions regarding your project.')}
        ${chalk.green.bgBlack('I will digest all of your weak answers.')}
        ${chalk.green.bgBlack('I will then poop out a beautiful readeMe.md file for you to plagiarize.')}
        
    `)
}



function getData() {
    inquirer
        .prompt([
            {
                type: "input",
                message: `What is the ${chalk.bold("title")} of your project?`,
                name: "title",
            },
            {
                type: "input",
                message: "Write a description here:",
                name: "description",
            },
            {
                type: "input",
                message: "Write instructions for installation:",
                name: "installation",
            },
            {
                type: "input",
                message: "Describe how to use your project:",
                name: "usage",
            },
            {
                type: "input",
                message: `Credit your contributors (${chalk.red.bgBlack("don't forget me!")}):`,
                name: "contributing",
            },
            {
                type: "input",
                message: "Describe how to test your project:",
                name: "tests",
            },
            {
                type: "list",
                message: "Choose a license",
                choices: ["none", "MIT", "Apache 2.0", "ISC", "BSD 3-Clause", "BSD 2-Clause", "Creative Commons v0 1.0"],
                name: "license",
            },
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "github",
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "email",
            },
        ])
        .then((answers) => {
            data = answers;
            data.name = name;
            handleAnswer();
        });
}

async function handleAnswer(){
    const spinner = createSpinner('Beep. Boop.. Processing...').start();
    await sleep();
    readMe = generateMarkdown(data);
    writeReadme();
    spinner.success({ text: `Good job me!`});
    await sleep();
    await results();
}

function writeReadme(){
    fs.writeFile(`./generated_readmes/${data.title}_readme.md`, readMe, (err) =>
    err ? console.error(err) : console.log('Success!')
   );
}

async function results(){
    console.clear();
    const msg = `Congrats, ${name}!\nYou made a Pro ReadMe!`;
    figlet(msg, (err,data) => {
        console.log(gradient.pastel.multiline(data));
    });
    await sleep();
    await sleep();
    console.log(chalk.green.bgBlack.bold(`Here is the contents of ${data.title}_readme.md:`))
    console.log(chalk.green.bgBlack(readMe));
    await sleep();
    await sleep();
    process.exit(0);
}
//declare functions


//main
await askName();
await welcome();
await getData();