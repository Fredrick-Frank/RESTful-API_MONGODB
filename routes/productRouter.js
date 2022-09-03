const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

//setting the routes: get, post, put, delete
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

//get one product with an ID:
router.get('/:id', getProduct, (req, res) => {
    res.send(res.product.title)
});

//Creating a product
router.post('/', async (req, res) =>{
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//updating by ID:
router.patch('/:id', getProduct, async (req, res) => {
    if(req.body.title != null) {
        res.product.title = req.body.title
    }
    if (req.body.price != null) {
        res.product.price = req.body.price
    }
    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
});

//delete a product by id
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove()
        res.json({ message: 'The product is deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

//generating a middleware
async function getProduct (req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({message: 'The product can not be found'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.product = product
    next()
};

module.exports = router;