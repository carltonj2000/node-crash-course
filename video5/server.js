const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log("hello");
  });

  greet();
  greet();

  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      return;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  const hmtl = fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end();
      return;
    }
    res.end(data);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "localhost", () => {
  console.log(`Server listening for request on port ${PORT}.`);
});