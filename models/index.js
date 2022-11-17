const OrderDetail = require("./OrderDetail");
const Product = require("./Product");
const ProductCategory = require("./ProductCategory");
const ShoppingCart = require("./ShoppingCart");
const User = require("./User");
const UserAddress = require("./UserAddress");
const UserPayment = require("./UserPayment");

//Se establecen las relaciones de la tabla por medio de su Id
UserAddress.belongsTo(User, { as: "user", foreignKey: "residentId" });
//so User is the source model and UserAddress is the target model, only User knowns about the existence about this associations
//empleando la modalidad de pares, se pueden utilizar el metodo include en ambos, ya que estos se reconocen mutuamente.
User.hasOne(UserAddress, { foreignKey: "residentId" });

UserPayment.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(UserPayment, { foreignKey: "userId" });

Product.belongsTo(ProductCategory, {as: "category", foreignKey: "categoryId"});
ProductCategory.hasMany(Product, { foreignKey: "categoryId" });

OrderDetail.belongsTo(User, { as: "user", foreignKey: "userOrderId" });
User.hasMany(OrderDetail, { foreignKey: "userOrderId" });

OrderDetail.belongsTo(Product, { as: "product", foreignKey: "productId" });
Product.hasMany(OrderDetail, { foreignKey: "productId" });

ShoppingCart.belongsTo(User, { as: "user", foreignKey: "userShoppingId" });
User.hasMany(ShoppingCart, { foreignKey: "userShoppingId" });

ShoppingCart.belongsTo(Product, { as: "product", foreignKey: "productId" });
Product.hasMany(ShoppingCart, { foreignKey: "productId" });

module.exports = {
  OrderDetail,
  Product,
  ProductCategory,
  ShoppingCart,
  User,
  UserAddress,
  UserPayment,
};
