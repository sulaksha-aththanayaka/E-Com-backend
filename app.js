const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const productsRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')

const api = process.env.API_URL;
const app = express();

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready');
})
.catch((err) => {
    console.log(err.cause);
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});