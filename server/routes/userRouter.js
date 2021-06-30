// create routers
const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/AuthMiddleware');
// routes
router.post("/register", UserController.registration); // регистрация пользователя
router.post("/login", UserController.login); // логин
router.get("/auth", authMiddleware, UserController.checkAuth);

module.exports = router;