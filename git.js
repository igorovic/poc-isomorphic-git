const git = require("isomorphic-git")
const fs = require("fs")

git.add({ fs, dir: './', filepath: '.' }).then(()=>console.log('git add done'));

let sha = git.commit({
  fs,
  dir: './',
  author: {
    name: 'Mr. Test',
    email: 'mrtest@example.com',
  },
  message: 'Added the a.txt file'
})
console.log(sha)

