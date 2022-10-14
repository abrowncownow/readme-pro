const fs = require('fs');
const inquirer = require('inquirer');
const { generate } = require('rxjs');
const generateMarkdown = require('./generateMarkdown')
var data;
var readMe;


//Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
//Declare Functions
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
            readMe = generateMarkdown.generateMarkdown(data);
        });
}

function updateReadMe(data){
    for (const answer of data){

    }
}

function init(){
    getData();
}
//declare functions

//Readme 

//init
init();