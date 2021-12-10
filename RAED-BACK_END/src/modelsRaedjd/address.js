const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  }, 
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
 
  state: {
    type: String,
    required: true,
    required: true,
  },
  landmark: {
    type: String,
    min: 10,
    max: 100,
  },
 

});


const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);