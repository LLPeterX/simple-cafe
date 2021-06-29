const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
}
);

const Backet = sequelize.define('backet', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //user_id: { type: DataTypes.INTEGER }, // User -> Backet
}
);

const BacketProduct = sequelize.define('backet_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //backet_id: { type: DataTypes.INTEGER }, // 
  //product_id: { type: DataTypes.INTEGER }, // Backet -> BacketProduct
  qty: { type: DataTypes.INTEGER, allowNull: false },
}
);

const ProductType = sequelize.define('product_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
}
);

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

const ProductInfo = sequelize.define('product_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
}
);

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //userId: { type: DataTypes.INTEGER },
  //productId: { type: DataTypes.INTEGER }
}
);
// Внешние ключи

// User -> Backet
User.hasOne(Backet);
Backet.belongsTo(User);

//User -> Rating
User.hasMany(Rating);
Rating.belongsTo(User);

// Backet -> BacketProduct
Backet.hasMany(BacketProduct);
BacketProduct.belongsTo(Backet);

// ProductType -> Product
ProductType.hasMany(Product);
Product.belongsTo(ProductType);

// Product -> Rating
Product.hasMany(Rating);
Rating.belongsTo(Product);

//Product -> Backet
Product.hasMany(BacketProduct);
BacketProduct.belongsTo(Product);

// Product -> ProductInfo
Product.hasOne(ProductInfo);
ProductInfo.belongsTo(Product);

module.exports = {
  User, Backet, BacketProduct, ProductType, Product, ProductInfo, Rating
}