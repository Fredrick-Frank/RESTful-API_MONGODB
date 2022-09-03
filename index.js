//config. the env
require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

//connecting to the database:
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to DB'));

//the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//connecting the routes for products
const proRouter = require('./routes/productRouter');
app.use('/products', proRouter);

//connecting the routes for reviews
const proReview = require('./routes/reviewRouter');
app.use('/reviews', proReview);


//creating the server
app.listen(3031, () => {
    console.log('My testing server at port 3031')
});