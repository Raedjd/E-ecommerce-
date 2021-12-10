const cart = require("../modelsRaedjd/cart");
const ObjectID = require('mongoose').Types.ObjectId;
const UserCart = require("../modelsRaedjd/cart");

exports.addItemToCart = (req, res) => {
  //  res.json({message:'welcome Raed jaidi'}) //testing
  const { payload } = req.body;
  if (payload.cart) {
    if (payload.cart._id) {
      UserCart.findOneAndUpdate(
        { user: req.user._id, "Cart._id": payload.cart._id },
        {
          $set: {
            "Cart.$": payload.cart,
          },
        }
      ).exec((error, Cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          res.status(201).json({ cart });
        }
      });
    } else {
      UserCart.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            cart: payload.cart,
          },
        },
        { new: true, upsert: true }
      ).exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          res.status(201).json({ cart });
        }
      });
    }
  } else {
    res.status(400).json({ error: "Params Cart required" });
  }
};

//////////////////////////////////////RAED JAIDI////////////////////////////////

exports.getCartItems =(req, res) => {
  UserCart.findOne({ user: req.user._id }).exec((error, UserCart) => {
    if (error) return res.status(400).json({ error });
    if (UserCart) {
      res.status(200).json({ UserCart });
    }
  });
};

  exports.removeCartItems= (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
    UserCart.findByIdAndRemove( 
    req.params.id,
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    
    })
};
//////////////////////////////////////RAED JAIDI////////////////////////////////  