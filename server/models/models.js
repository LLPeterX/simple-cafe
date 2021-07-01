const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Пользователь (клиент)
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
}
);

// Корзина пользвателя. Создаем при создании пользователя
const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //userId: { type: DataTypes.INTEGER }, // User -> Basket
}
);

// Продукт в корзине пользователя. Включяя количество
const BasketProduct = sequelize.define('backet_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  qty: { type: DataTypes.INTEGER, allowNull: false },
}
);

// Тип продукта (первые блюда, вторые и т.п.)
const ProductType = sequelize.define('product_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
}
);

// Конкретный продукт
const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: true }, // может быть пустым!
  //typeId: { type: DataTypes.INTEGER },
  vegan: { type: DataTypes.INTEGER, defaultValue: 0 },
  time: { type: DataTypes.INTEGER, defaultValue: 0 },
  available: { type: DataTypes.INTEGER, defaultValue: 1 }
}
);

// Подробная информация о продукте
const ProductInfo = sequelize.define('product_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
}
);

// Рейтинг продукта
const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}
);

// Внешние ключи

// User -> Basket
User.hasOne(Basket);
Basket.belongsTo(User);

//User -> Rating
User.hasMany(Rating);
Rating.belongsTo(User);

// Basket -> BasketProduct
Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

// ProductType -> Product
ProductType.hasMany(Product);
Product.belongsTo(ProductType);

// Product -> Rating
Product.hasMany(Rating);
Rating.belongsTo(Product);

//Product -> Basket
Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

// Product -> ProductInfo
Product.hasOne(ProductInfo);
ProductInfo.belongsTo(Product);

module.exports = {
  User, Basket, BasketProduct, ProductType, Product, ProductInfo, Rating
}