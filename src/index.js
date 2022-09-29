const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//initilizations
const app = express();

//settings
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleares

//config multer storage and filename orignal
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

//upload iamge for multer
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/uploads"),
    //limite de peso de las imagenes 25M
    limits: { fileSize: 25000000 },
    //filter type image acepted
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|git/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb("Error: Archivo debe ser imagen valida");
    },
  }).single("image")
);

//routes
app.use(require("./routes/index.routes"));

//static files
app.use(express.static(path.join(__dirname, "public")));

//start the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
