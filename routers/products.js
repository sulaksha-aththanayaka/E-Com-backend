const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const Category = require('../models/category')

router.get('/', async (req, res) => {
    const products = await Product.find();

    if(!products){
      res.status(500).json({
        success: false
      })
    }
  res.send(products);
});

router.post('/', async (req, res) => {
  const { name, description, richDescription, image, brand, price, category, countInStock, rating, numReviews, isFeatured } = req.body;

  const existingCategory = await Category.findById(category);

  if(!existingCategory) return res.status(400).send('Invalid Category');

  let product = new Product({
    name, 
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured
  })

  product = await product.save();

  if(!product) return res.status(500).send('The product cannot be created');

  res.send(product);
});

module.exports = router;