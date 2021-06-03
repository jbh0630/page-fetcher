const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
const URL = args[0];
const path = args[1];

request(URL, (error, response, body) => {
  if (fs.existsSync(path)) {
    rl.question('The file is alreay exist. Do you want to overwrite it? (y/n)', (answer) => {
      if (answer === 'y') {
        console.log(`You chose ${answer}! Let's overwrite it!`);
        fs.writeFile(path, body, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
          }
        });
      } else {
        console.log(`You chose ${answer}! Try new file path!`);
        process.exit();
      }
      rl.close();
    });
  } else if (!URL || !path) {
    console.log('URL or PATH went wrong! Try again!');
  } else {
    fs.writeFile(path, body, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
      }
      process.exit();
    });
  }
});
