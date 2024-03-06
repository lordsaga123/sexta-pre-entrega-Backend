const productsRouter = require('./products.route.js');
const cartsRouter = require('./carts.route.js');
const viewRouter = require('./view.route.js');
const userRouter = require('./user.route.js');
const sessionRouter = require('./sessions.route.js');


module.exports = {
    productsRouter,
    cartsRouter,
    viewRouter,
    userRouter,
    sessionRouter
}