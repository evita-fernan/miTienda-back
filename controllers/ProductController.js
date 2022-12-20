const { Product } = require("../database/models");
const { Category } = require("../database/models");
require("dotenv").config();

module.exports = {
  //Cargar un producto
  addProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Editar un producto
  editProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      const productEdited = await Product.update(req.body, {
        where: { id: id },
      });
      res
        .status(200)
        .json(productEdited, { msg: "Product successfully edited" });
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
        return res.status(404).json({ msg: "Product not found" });
      }
      const productDeleted = await Product.destroy({ where: { id: id } });
      res
        .status(200)
        .json(productDeleted, { msg: "Product successfully removed" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener todos los productos de una categoría
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: { model: Category },
      });
      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener un producto
  getProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, { include: Category });
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
