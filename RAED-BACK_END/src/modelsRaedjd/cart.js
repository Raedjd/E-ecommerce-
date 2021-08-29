const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true }
  

});


const userCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cart: [cartSchema],
  },
  { timestamps: true }
);

mongoose.model("Cart", cartSchema);
module.exports = mongoose.model("UserCart", userCartSchema);