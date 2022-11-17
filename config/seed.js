const db = require("./db");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const seedProducts = require("../utils/seedProducts");
const seedProductCategories = require("../utils/seedProductCategories");
require("../models/index");

const setupSeed = async () => {
  try {
    console.log("Starting seed");
    const productCategories = await ProductCategory.bulkCreate(seedProductCategories)
    const products = await Product.bulkCreate(seedProducts);
    console.log("Seed successfully");
    Promise.all([productCategories, products]);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  try {
    const sync = await db.sync({ force: false });
    const setSeed = await setupSeed();
    const exit = await process.exit(0);
    Promise.all([sync, setSeed, exit]);
  } catch (error) {
    console.log(error);
    await process.exit(1);
  }
})();
