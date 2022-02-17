const fs = require('fs');
const fileName = './db.json'
const file = require(fileName);

switch (process.argv[2]) {
  case 'clean':
    file.posts = []
    break;
  default:
    file.posts.push([
      { "id": new Date().getTime(), "title": `title-${new Date().getTime()}`, "author": `author-${new Date().getTime()}` }
    ])
}

fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});