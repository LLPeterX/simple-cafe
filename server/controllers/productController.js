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
const { Product } = require('../models/models');
const ApiError = require('../errors/apiError');
//const { Op } = require('sequelize');

class ProductController {
  async create(req, res, next) {
    try {
      const { name, price, rating, vegan, time, available, productproductTypeIdId } = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const product = await Product.create({
        name, price, rating, vegan, time, available, productproductTypeIdId, img: fileName
      });
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // get all products
  async getAll(req, res) {
    const { productTypeId, vegan, available } = req.query;
    let products;
    if (!productTypeId && !vegan && !available) {
      products = await Product.findAll();
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
      products = await Product.findAll({ where: selectOptions });

    }
    return res.json(products);
  }

  async get() {

  }
}

module.exports = new ProductController();