#!/usr/bin/env node
import prompts from "prompts";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
import { writeFile, lstat, readdir, mkdir, copyFile, readFile } from "fs/promises";
import { title } from "node:process";
const templates = [{
    value: "react-js",
    title: "React + TailwindCSS (JS)",
    description: "Full JavaScript Vite React App with TailwindCSS Configured"
}, {
    value: "react-ts",
    title: "React + TailwindCSS (TS)",
    description: "Full TypeScript Vite React App with TailwindCSS Configured"
}, {
    value: "vanilla-js",
    title: "Vanilla + TailwindCSS (JS)",
    description: "Full JavaScript Vanilla App with TailwindCSS Configured"
}, {
    value: "node-ts",
    title: "Node.js + TypeScript + Postgres",
    description: "Full Template for Nodejs with Typescript using Express and PostgreSQL"
}];
const copyFilesAndDirectories = async (source, destination) => {
    const entries = await readdir(source);
    for (const entry of entries) {
        const sourcePath = path.join(source, entry);
        const destPath = path.join(destination, entry);
        const stat = await lstat(sourcePath);
        if (stat.isDirectory()) {
            // Create the directory in the destination
            await mkdir(destPath);

            // Recursively copy files and subdirectories
            await copyFilesAndDirectories(sourcePath, destPath);
        } else {
            // Copy the file
            await copyFile(sourcePath, destPath);
        }
    }
};
const renamePackageJsonName = async (targetDir, projectName) => {
    const packageJsonPath = path.join(targetDir, "package.json");
    try {
        const packageJsonData = await readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(packageJsonData);
        packageJson.name = projectName;
        await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");
    } catch (err) {
        console.log(err.message);
    }
};
(async () => {
    try {
        const response = await prompts([{
            type: "select",
            name: "template",
            message: "Select template",
            choices: templates
        }, {
            type: "text",
            name: "projectName",
            message: "Enter your project name",
            initial: "my-project",
            format: val => val.toLowerCase().split(" ").join("-"),
            validate: (val) => true
            // validate: val => projectNamePattern.test(val) ? true : "Project name should not contain special characters except hyphen (-)"
        }]);
        const {
            projectName,
            template
        } = response;
        const targetDir = path.join(process.cwd(), projectName);
        const sourceDir = path.resolve(fileURLToPath(import.meta.url), "../templates", `${template}`);
        if (!fs.existsSync(targetDir)) {
            // Copying logic
            console.log("Target directory doesn't exist");
            console.log("Creating directory...");
            fs.mkdirSync(targetDir, {
                recursive: true
            });
            console.log("Finished creating directory");
            await copyFilesAndDirectories(sourceDir, targetDir);
            await renamePackageJsonName(targetDir, projectName);
            console.log(`Finished generating your project ${projectName}`);
            console.log(`cd ${projectName}`);
            console.log(`npm install`);
        } else {
            throw new Error("Target directory already exist!");
        }
    } catch (err) {
        console.log(err);
    }
})();