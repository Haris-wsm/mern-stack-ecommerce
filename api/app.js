const express = require('express');
const cors = require('cors');
const app = express();

// Routers

const userRouter = require('./user/userRouter');
const authRouter = require('./auth/authRouter');
const productRouter = require('./products/productRouter');
const cartRouter = require('./carts/cartRouter');
const orderRouter = require('./orders/orderRouter');
const paymentRouter = require('./payments/paymentRoute');

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/billing', paymentRouter);

module.exports = app;
