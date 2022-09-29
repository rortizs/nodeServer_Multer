const { Router } = require("express");
const path = require("path");

const router = Router();

//route initial paint form html
router.get("/", (req, res) => {
  res.render("index");
});

//route upload file image
router.post("/upload", (req, res) => {
  console.log(req.file);
  res.send("uploaded");
});

module.exports = router;
