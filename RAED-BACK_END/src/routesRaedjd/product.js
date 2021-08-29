
const express = require("express");
//const {  } = require('../controller/category');
const { requireSignin,adminMiddleware} = require('../mediatorPerson/middle');

const {createProduct, getProducts,getProductDetailsById,updateProduct,deleteProductById }
 = require('../controllerRaedjd/product');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const shortid = require('shortid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
  const upload = multer({storage});

router.post('/product/create',requireSignin,adminMiddleware,upload.array("productPicture"),createProduct);
router.get("/product/getproducts",requireSignin,adminMiddleware,getProducts);
router.get("/product/getprodbyid/:productId",requireSignin,adminMiddleware,getProductDetailsById);
router.put("/product/update/:id",requireSignin,adminMiddleware,upload.array("productPicture"),updateProduct);
router.delete("/product/delete/:id",requireSignin,adminMiddleware,deleteProductById);



module.exports = router;