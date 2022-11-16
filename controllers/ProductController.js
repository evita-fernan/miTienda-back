const User = require("../models/User");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductInventory = require("../models/ProductInventory");
require("dotenv").config();

module.exports = {
  //Cargar un producto
  addProduct: async (req, res) => {
    const { name, price, img, description, category } = req.body;
    try {
      const product = await Product.create({
        name,
        price,
        img,
        description,
        category
      });
      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  //Editar un producto
  editProduct: async (req, res) => {
    const { id } = req.params;
    const { name, price, img, description, category } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }
      const productEdited = await Product.update(
        {
          name,
          price,
          img,
          description,
          category,
        },
        { where: { id: id } }
      );
      res
        .status(200)
        .json(productEdited, { msg: "Producto editado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Eliminar un producto
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }
      const productDeleted = await Product.destroy({ where: { id: id } });
      res
        .status(200)
        .json(productDeleted, { msg: "Producto eliminado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener todos los productos de una categoría
  getAllProducts: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const products = await Product.findAll({ include: {model: ProductCategory, as: "product"} });
      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener un producto
  getProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, { include: ProductCategory });
      if (!product) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }
      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
