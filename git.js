/*
push to github with isomorphic-git

requirements:
  - the current folder must be initialized with git
  - git remote repo must be configured
  - have a personal token or oAuth access token from github
    - not tested with personal token but should work
*/
const git = require("isomorphic-git");
const fs = require("fs");
const http = require("isomorphic-git/http/node");
require("dotenv").config();

async function runall() {
  try {
    // stage all files in current directory
    await git.add({ fs, dir: "./", filepath: "." }); 

    // commit the files
    let sha = await git.commit({
      fs,
      dir: "./",
      author: {
        name: "Mr. Test",
        email: "mrtest@example.com",
      },
      message: "did some modification",
    });
    console.log("sha: ", sha);

    // push to the remote repo
    let pushResult = await git.push({
      fs,
      http,
      dir: "./",
      remote: "origin",
      ref: "main",
      force: true,
      onAuth: () => {
        console.log("onAuth called");
        return {
          username: "token",
          password: process.env.GITHUB_TOKEN,
        };
      },
      onAuthSuccess: (url, auth) => {
        console.log("AUTH success", url, auth);
      },
      onAuthFailure: (url, auth) => {
        console.log("AUTH failure", url, auth);
      },
    });
    console.log("push result", pushResult);
  } catch (err) {
    console.error("ERROR", err);
  }
}

runall()
  .then((R) => {
    console.log("final result", R);
  })
  .catch((err) => {
    console.error(err);
  });

