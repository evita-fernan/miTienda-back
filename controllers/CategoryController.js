const { Category } = require("../database/models");
const { Product } = require("../database/models");
require("dotenv").config();

module.exports = {
  //Cargar categorías
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Editar categoría
  editCategory: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }
      const categoryEdited = await ProductCategory.update(
        {
          name,
        },
        { where: { id: id } }
      );
      res
        .status(200)
        .json(categoryEdited, { msg: "Category successfully edited" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Eliminar categoría
  deleteCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }
      const categoryDeleted = await ProductCategory.destroy({
        where: { id: id },
      });
      res
        .status(200)
        .json(categoryDeleted, { msg: "Category successfully removed" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener categorías
  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener una categoría
  getCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener todos los productos de una categoría
  getProductsByCategory: async (req, res) => {
    const { categoryId } = req.params;
    const products = await Category.findAll({
      where: { id: categoryId },
      include: { model: Product },
    });
    try {
      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
