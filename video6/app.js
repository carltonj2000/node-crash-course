const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { request } = require("express");

const Blog = require("./models/blog.js");

const app = express();
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));

/* Mongoose test
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new Blog 2",
    snippet: "about my new blog",
    body: "more about my new blog",
  });
  blog
    .save()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.log(err));
});

app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("5ef57898c58ecb6f56f18388")
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.log(err));
});
*/

app.get("/", (req, res) => {
  return res.redirect("/blogs");
  // old test data below
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Blog CJ", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("index", { title: "Blog CJ", blogs });
    })
    .catch((err) => console.log(err));
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

const PORT = process.env.PORT || 3000;

const dbURI = "mongodb://localhost/node-tuts";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, "localhost", () =>
      console.log(`Listening on port ${PORT}.`)
    )
  )
  .catch((err) => console.error(err));
