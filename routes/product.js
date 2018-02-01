const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/* CRUD -> READ ALL */
router.get('/', (req, res, next) => {
  Product.find().exec((err, products) => {
    res.render('products/index', {
      products: products
    });
  });
});

/* CRUD -> READ DETAIL */
router.get('/detail/:id', (req,res) => {
  const productId = req.params.id;

  Product.findById(productId, (err, product) => {
    if (err) { return next(err); }
    res.render('products/detail', { product: product });
  });
})


/* CRUD -> UPDATE FORM */
router.get('/detail/:id/edit', (req,res) => {
  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) { return next(err); }
    res.render('products/update', { product: product });
  });
})


/* CRUD -> UPDATE DATABASE */
router.post('/detail/:id/edit', (req,res) => {
  const productId = req.params.id;
  const {name,price,imageUrl,description} = req.body;
  const updates = {name,price,imageUrl,description};

  Product.findByIdAndUpdate(productId, updates, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/');
  });
})


/* CRUD -> CREATE FORM */
router.get('/new', (req, res) => {
  res.render('products/new');
});

/* CRUD -> CREATE DATABASE */
router.post('/new', (req, res) => {
  const {name,price,imageUrl,description} = req.body;
  const product = new Product({name,price,imageUrl,description});
  product.save( err => {
    if (err) { return next(err) }
    res.redirect('/');
  })
});


router.get('/delete/:id', (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/');
  });
});




module.exports = router;
