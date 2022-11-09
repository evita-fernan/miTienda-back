const OrderDetail = require("./OrderDetail");
const Product = require("./Product");
const ProductCategory = require("./ProductCategory");
const ProductInventory = require("./ProductInventory");
const ShoppingCart = require("./ShoppingCart");
const User = require("./User");
const UserAddress = require("./UserAddress");
const UserPayment = require("./UserPayment");

//Se establecen las relaciones de la tabla por medio de su Id
UserAddress.belongsTo(User, { as: "client", foreignKey: "userId" });
//so User is the source model and UserAddress is the target model, only User knowns about the existence about this associations
//empleando la modalidad de pares, se pueden utilizar el metodo include en ambos, ya que estos se reconocen mutuamente. 
User.hasOne(UserAddress, { as: "address", foreignKey: "userId" });

UserPayment.belongsTo(User, { as: "client", foreignKey: "userId" });
User.hasMany(UserPayment, { as: "payment", foreignKey: "userId" });

Product.belongsTo(ProductCategory, {
  as: "category",
  foreignKey: "categoryId",
});
ProductCategory.hasMany(Product, { as: "product", foreignKey: "categoryId" });

ProductInventory.belongsTo(Product, { as: "product", foreignKey: "productId" });
Product.hasOne(ProductInventory, { as: "inventory", foreignKey: "productId" });

OrderDetail.belongsTo(User, { as: "client", foreignKey: "userId" });
User.hasMany(OrderDetail, { as: "order", foreignKey: "userId" });

OrderDetail.belongsTo(Product, { as: "product", foreignKey: "productId" });
Product.hasMany(OrderDetail, { as: "order", foreignKey: "productId" });

ShoppingCart.belongsTo(User, { as: "client", foreignKey: "userId" });
User.hasMany(ShoppingCart, { as: "shopping", foreignKey: "userId" });

ShoppingCart.belongsTo(Product, { as: "product", foreignKey: "productId" });
Product.hasMany(ShoppingCart, { as: "shopping", foreignKey: "productId" });

module.exports = {
  OrderDetail,
  Product,
  ProductCategory,
  ProductInventory,
  ShoppingCart,
  User,
  UserAddress,
  UserPayment,
};
