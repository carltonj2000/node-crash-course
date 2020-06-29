const Blog = require("../models/blog.js");

const blog_index = (_, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("blogs/index", { title: "Blog CJ", blogs });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (_, res) => {
  res.render("blogs/create", { title: "Create" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("blogs");
    })
    .catch((err) => console.error(err));
};

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Detail" });
    })
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
