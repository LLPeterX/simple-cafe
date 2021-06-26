// create routers
const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
// routes
router.post("/register", UserController.registration); // регистрация пользователя
router.post("/login", UserController.login); // логин
router.get("/auth", UserController.checkAuth);

module.exports = router;