const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controllerRaedjd/cart");
const { requireSignin, userMiddleware } = require("../mediatorPerson/middle");
const router = express.Router();

router.post("/user/cart/addtocart",requireSignin,userMiddleware,addItemToCart);
router.get("/user/cart/gettocart",requireSignin,userMiddleware, getCartItems);
router.delete("/user/cart/deletetocart/:id",requireSignin,userMiddleware, removeCartItems);

module.exports = router; 