const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("request made", req.url, req.method);

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
