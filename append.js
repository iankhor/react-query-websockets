const fs = require('fs');
const fileName = './db.json'
const file = require(fileName);

switch (process.argv[2]) {
  case 'clean':
    file.posts = []
    break;
  case 'progress-init':
    file.posts.push(
      {
        "id": 'progress-123',
        "progress": "*"
      }
    )
    break;
  case 'progress':
    const f = file.posts.find(f => f.id === 'progress-123')
    f.progress+="*"
    break;
  default:
    file.posts.push(
      {
        "id": new Date().getTime(),
        "progress": "*"
      }
    )
}

fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  // console.log(JSON.stringify(file));
  // console.log('writing to ' + fileName);
});