const fs = require("fs");

const readStream = fs.createReadStream(
  "./docs/blog4.txt",
  { encoding: "utf8", highWaterMark: 1024 },
);

const writeStream = fs.createWriteStream(
  "./docs/blog5.txt",
  { encoding: "utf8", highWaterMark: 1024 },
);
readStream.on("data", (chunk) => {
  const out = "\n----- new chunk ------\n" + chunk;
  console.log(out);
  writeStream.write(out);
});

const readStream2 = fs.createReadStream("./docs/blog4.txt");
const writeStream2 = fs.createWriteStream("./docs/blog6.txt");

readStream2.pipe(writeStream2);
