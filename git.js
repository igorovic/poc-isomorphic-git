const git = require("isomorphic-git")
const fs = require("fs")
const http = require('isomorphic-git/http/node')

git.add({ fs, dir: './', filepath: '.' }).then(()=>console.log('git add done'));

let sha = git.commit({
  fs,
  dir: './',
  author: {
    name: 'Mr. Test',
    email: 'mrtest@example.com',
  },
  message: 'Added the a.txt file'
}).then(() => {
console.log(sha);
});

let pushResult = git.push({
  fs,
  http,
  dir: './',
  remote: 'origin',
  ref: 'main',
  onAuth: () => ({
      //oauth2format: 'github',
      token: "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",
  })
}).then((result) => console.log(result))
.catch((err) => console.log("error", err));

