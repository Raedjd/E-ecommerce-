const Category = require("../modelsRaedjd/category");
const ObjectID = require('mongoose').Types.ObjectId;
const slugify = require("slugify");


function createCategories(categories, parentId = null) {
  //  res.json({message:'welcome Raed jaidi'}) //testing
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }
//////////////////////////////////////RAED JAIDI////////////////////////////////
exports.addCategory = (req, res) => {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
      
    };
  
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
  
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        return res.status(201).json({ category });
      }
    });
}
//////////////////////////////////////RAED JAIDI////////////////////////////////

exports.getCategories = (req, res) => {
  console.log("hello word")
    Category.find({}).exec((error, categories) => {
      if (error) return res.status(400).json({ error });
      if (categories) {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
      }
    });
  };

//////////////////////////////////////RAED JAIDI////////////////////////////////
  exports.updateCategories = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
    
    const updateRecord = {
      name: req.body.name,
      slug: slugify(req.body.name),
      type: req.body.type,
      categoryImage: req.categoryImage,
      parentId: req.body.parentId
      
    };
  //////////////////////////////////////RAED JAIDI////////////////////////////////
    Category.findByIdAndUpdate(
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
  exports.deleteCategories = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
    Category.findByIdAndRemove( 
    req.params.id,
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    
    })
};
//////////////////////////////////////RAED JAIDI////////////////////////////////