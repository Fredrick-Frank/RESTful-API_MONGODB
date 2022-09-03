const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');

//setting the routes: get, post, put, delete
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()
        res.json(reviews)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});


//get one review with an ID:
router.get('/:id', getReview, (req, res) => {
    res.send(res.review.description)
});

//Creating a review
router.post('/', async (req, res) =>{
    const review = new Review({
        rating: req.body.rating,
        description: req.body.description
    })
    try {
        const newReview = await review.save()
        res.status(201).json(newReview)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//updating by ID:
router.patch('/:id', getReview, async (req, res) => {
    /*if(req.body.rating != null) {
        res.review.rating = req.body.rating
    }*/
    if (req.body.description != null) {
        res.review.description = req.body.description
    }
    try {
        const updatedReview = await res.review.save()
        res.json(updatedReview)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
});

//delete a product by id
router.delete('/:id', getReview, async (req, res) => {
    try {
        await res.review.remove()
        res.json({ message: 'The review is deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

//generating a middleware
async function getReview (req, res, next) {
    let review
    try {
        review = await Review.findById(req.params.id)
        if (review == null) {
            return res.status(404).json({message:'The review can not be found'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.review = review
    next()
};

module.exports = router;