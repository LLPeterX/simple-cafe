const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/typeController');

router.post("/", TypeController.create); // создание типа
router.get("/", TypeController.getAll); // получение всех типов
router.get("/:id", TypeController.get); // получение конкретного

module.exports = router;
