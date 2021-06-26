// create routers
const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const productRouter = require('./productRouter');

// main routes
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/type", typeRouter);


module.exports = router;