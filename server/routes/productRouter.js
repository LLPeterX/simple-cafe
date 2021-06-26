const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/productController');

router.post("/", ProductController.create); // создание продукта
router.get("/", ProductController.getAll); // получение всех продуктов
router.get("/:id", ProductController.get); // получение конкретного подукта

module.exports = router;
