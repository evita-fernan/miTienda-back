const ProductCategory = require("../models/ProductCategory");
const Product = require("../models/Product");
require("dotenv").config();

module.exports = {
  //Cargar categorías
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await ProductCategory.create({ name });
      res.send(category);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  //Editar categoría
  editCategory: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await ProductCategory.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: "Categoría no encontrada" });
      }
      const categoryEdited = await ProductCategory.update(
        {
          name,
        },
        { where: { id: id } }
      );
      res
        .status(200)
        .json(categoryEdited, { msg: "Producto editado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Eliminar categoría
  deleteCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await ProductCategory.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: "Categoría no encontrada" });
      }
      const categoryDeleted = await ProductCategory.destroy({
        where: { id: id },
      });
      res
        .status(200)
        .json(categoryDeleted, { msg: "Producto eliminado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener categorías
  getCategories: async (req, res) => {
    try {
      const categories = await ProductCategory.findAll();
      res.send(categories);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  //Obtener una categoría
  getCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await ProductCategory.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: "Categoría no encontrada" });
      }
      res.send(category);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  //Obtener todos los productos de una categoría
  getProductsByCategory: async (req, res) => {
    const { categoryId } = req.params;
    const products = await ProductCategory.findAll({
      where: { id: categoryId },
      include: { model: Product },
    });
    try {
      res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
