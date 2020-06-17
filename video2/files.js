const fs = require("fs");

const blogFn = "./docs/blog1.txt";
const data = fs.readFile(blogFn, (err, data) => {
  if (err) return console.error(err);
  console.log(data.toString());
});

console.log("last line");

fs.writeFile("./docs/blog2.txt", "hello carlton", (err) => {
  if (err) return console.log(err);
  console.log("file written");
});

const fn = "docs/assets";
if (!fs.existsSync(fn)) {
  fs.mkdir(fn, (err) => {
    if (err) return console.log(err);
    console.log("folder created");
  });
} else {
  console.log("file already exists removing it");
  fs.rmdir(fn, (err) => {
    if (err) return console.log(err);
    console.log("folder deleted");
  });
}

const delFn = "./docs/blog3.txt";
if (fs.existsSync(delFn)) {
  fs.unlink(delFn, (err) => {
    if (err) return console.log(err);
    console.log("file deleted");
  });
} else console.log("del file does not exist");
