const { Router } = require("express");

const {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
} = require("../controllers/blogController");

const router = Router();

router.get("/", blog_index);
router.get("/create", blog_create_get);
router.post("/", blog_create_post);
router.get("/:id", blog_details);
router.delete("/:id", blog_delete);

module.exports = router;
