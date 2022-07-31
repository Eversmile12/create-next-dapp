#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log("Please, provide a name for your DApp")
    console.log("Example:");
    console.log("npx create-next-dapp my-dapp")
    process.exit(1)
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = "https://github.com/Eversmile12/create-next-dapp.git";
console.log(projectPath)

try {
    fs.mkdirSync(projectName)
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
      } else {
        console.log(error);
      }
    process.exit(1);
}

async function main() {
    try {
        console.log("Downloading files...");
        execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

        process.chdir(projectPath);

        console.log("Installing dependencies")
        execSync("npm install");

        console.log("Cleaning up useless files");
        execSync("npx rimraf ./.git");
        fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true })
        

    } catch(error) {
        console.log(error)
    }
}

main()