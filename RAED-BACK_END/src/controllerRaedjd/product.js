
const Product = require("../modelsRaedjd/product");
const ObjectID = require('mongoose').Types.ObjectId;
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../modelsRaedjd/category");

exports.createProduct = (req, res) => {
  //  res.json({message:'welcome Raed jaidi'}) //testing

  const { name, price, description,quantity, category, createdBy } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      return { img: file.filename };
    });
  }
//////////////////////////////////////RAED JAIDI////////////////////////////////
  const  product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id
  });
  product.save(((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product});
    }
  }));
 
};
//////////////////////////////////////RAED JAIDI////////////////////////////////

exports.getProducts = async (req, res) => {
    const products = await Product.find({ createdBy: req.user._id })
      .select("_id name price quantity slug description productPictures category")
      .populate({ path: "category", select: "_id name" })
      .exec();
  
    res.status(200).json({ products });
  };
  //////////////////////////////////////RAED JAIDI////////////////////////////////

  exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };
//////////////////////////////////////RAED JAIDI////////////////////////////////

  exports.updateProduct = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
    
    const updateRecord = {
      name: req.body.name,
      slug: slugify(req.body.name),
      price: req.body.price,
      quatity: req.quantity,
      description: req.body.description,
      offer: req.body.offer,
      productPictures: req.body.productPictures
      
      
    };
  //////////////////////////////////////RAED JAIDI////////////////////////////////

    Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateRecord},
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Update error : " + err);
      }
    )
  };
 //////////////////////////////////////RAED JAIDI////////////////////////////////
  
  exports.deleteProductById = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
    Product.findByIdAndRemove(
    req.params.id,
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    })
};