/* 
   id: { productTypeId: DataproductTypeIds.INTEGER, primaryKey: true, autoIncrement: true },
  name: { productTypeId: DataproductTypeIds.STRING, unique: true, allowNull: false },
  price: { productTypeId: DataproductTypeIds.DECIMAL, allowNull: false },
  rating: { productTypeId: DataproductTypeIds.INTEGER, defaultValue: 0 },
  img: { productTypeId: DataproductTypeIds.STRING, allowNull: true }, // может быть пустым!
  //productTypeIdId: { productTypeId: DataproductTypeIds.INTEGER }, // ????
  vegan: { productTypeId: DataproductTypeIds.INTEGER, defaultValue: 0 },
  time: { productTypeId: DataproductTypeIds.INTEGER, defaultValue: 0 },
  available: { productTypeId: DataproductTypeIds.INTEGER, defaultValue: 1 }

*/
const uuid = require('uuid');
const path = require('path');
const { Product, ProductInfo } = require('../models/models');
const ApiError = require('../errors/apiError');
//const { Op } = require('sequelize');

class ProductController {
  async create(req, res, next) {
    try {
      const { name, price, rating, vegan, time, available, productTypeId } = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const product = await Product.create({
        name, price, rating, vegan, time, available, productTypeId, img: fileName
      });
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // get all products
  async getAll(req, res) {
    const { productTypeId, vegan, available } = req.query;
    let { limit, page } = req.query;
    limit = limit || 9;
    page = page || 1;
    let offset = page * limit - limit;
    let products;
    if (!productTypeId && !vegan && !available) {
      products = await Product.findAndCountAll({ limit, offset });
    } else {
      let selectOptions = {};
      if (productTypeId) {
        selectOptions.productTypeId = productTypeId;
      }
      if (vegan) {
        selectOptions.vegan = vegan;
      }
      if (available) {
        selectOptions.available = available;
      }
      products = await Product.findAndCountAll({ where: selectOptions }, limit, offset);

    }
    return res.json(products);
  }

  // получаем конкретный продукт по id
  async get(req, res) {
    const { id } = req.params;
    const product = await Product.findOne(
      {
        where: { id },
        include: [{ model: ProductInfo, as: 'product_info' }]
      }
    );
    return res.json(product);
  }
}

module.exports = new ProductController();