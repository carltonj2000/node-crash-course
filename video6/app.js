const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { request } = require("express");

const Blog = require("./models/blog.js");

const app = express();
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.redirect("/blogs");
});

app.get("/about", (_, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (_, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("index", { title: "Blog CJ", blogs });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (_, res) => {
  res.render("create", { title: "Create" });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("blogs");
    })
    .catch((err) => console.error(err));
});

app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Detail" });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404", path: req.path });
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
