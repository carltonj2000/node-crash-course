const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

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

app.use("/blogs", blogRoutes);

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
