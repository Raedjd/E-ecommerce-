
const express = require("express");

const { addCategory, getCategories,updateCategories, deleteCategories } = 
require("../controllerRaedjd/category");

const {
    requireSignin,
    adminMiddleware
  } = require("../mediatorPerson/middle");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/category/create',requireSignin ,adminMiddleware,upload.array("categoryImage"),addCategory);
router.get('/category/getcategory',getCategories);
router.put("/category/update/:id",requireSignin ,adminMiddleware,upload.array("categoryImage"),updateCategories);
router.delete("/category/delete/:id",requireSignin ,adminMiddleware,deleteCategories);

module.exports = router; 