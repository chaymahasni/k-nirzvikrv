const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

router.get("/allproducts", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.send(docs);
    } else return res.status(400).json({ message: "Something wrong!" });
  });
});

router.post("/getproductbyid", (req, res) => {
  Product.find({ _id: req.body.productid }, (err, docs) => {
    if (!err) {
      res.send(docs[0]);
    } else return res.status(400).json({ message: "Something wrong!" });
  });
});

router.post("/addreview", async (req, res) => {
  const { review, productid, currentUser } = req.body;

  const product = await Product.findById({ _id: productid });

  const reviewmodel = {
    name: currentUser.username,
    userid: currentUser._id,
    rating: review.rating,
    comment: review.comment,
  };

  product.reviews.push(reviewmodel);

  var rating = product.reviews.reduce((acc, x)=> acc + x.rating , 0) / product.reviews.length

  product.rating = rating

  product.save((err) => {
    if (!err) {
      res.send("Review Successfully Sended ");
    } else return res.status(400).json({ message: "Something wrong!" });
  });
});


router.post("/deleteproduct" , (req, res) =>{

  Product.findByIdAndRemove(req.body.productid , (err)=>{
      if(err){
          return res.status(400).json({ message : 'Something wrong !'})
      }
      else{
           res.send("Product Deleted Successfully") 
      }
  })

})

router.post("/addproduct" , (req , res) =>{
  const {product} = req.body
  
  const productModel = new Product({

      name: product.name,
      price: product.price,
      unit: product.unit,
      countInStock: product.countInStock,
      imgurl: product.imgurl,
      description: product.description,
      rating: product.rating,
      category : product.category

  });
  
  productModel.save(err=>{

    if(err)
    {
      return res.status(400).json({ message : 'Something wrong !'})
    }
    else{
         res.send("Product Added Successfully")
    }
    
  });

})  ;

router.post("/updateproduct" , (req , res) =>{


  Product.findByIdAndUpdate(req.body.productid  , {

      name : req.body.updatedproduct.name,
      price : req.body.updatedproduct.price,
      unit : req.body.updatedproduct.unit,
      countInStock : req.body.updatedproduct.countInStock,
      imgurl : req.body.updatedproduct.imgurl,
      description : req.body.updatedproduct.description,
      category : req.body.updatedproduct.category

  } ,(err)=>{
      
    if(err)
    {
      return res.status(400).json({ message : 'Something wrong !'})
    }
    else{
         res.send("Product Updated Successfully")
    }


  })
  
  

})  ;

module.exports = router;
