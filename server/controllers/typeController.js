const { ProductType } = require('../models/models.js');
const ApiError = require('../errors/apiError.js');

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body; // получаем из тела запроса параметр name
      const type = await ProductType.create({ name }); // вызываем из модели метод create()
      return res.json(type); // возвращаем созданный объект
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // получение списка всех типов продуктов
  async getAll(req, res) {
    const types = await ProductType.findAll();
    return res.json(types);
  }

  async get(req, res) {
    const id = req.query.id;
    console.log('req=', req.query);
    const type = await ProductType.findByPk(id);
    return res.json(type);

  }
}

module.exports = new TypeController();