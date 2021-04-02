const git = require("isomorphic-git");
const fs = require("fs");
const http = require("isomorphic-git/http/node");
require("dotenv").config();

async function runall() {
  try {
    await git.add({ fs, dir: "./", filepath: "." }); //.then(()=>console.log('git add done'));

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

