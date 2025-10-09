const { Category, Subcategory, Product } = require("../models");

// Obtener todas las categorías
async function index(req, res) {
  try {
    const { includeSubcategories, includeProducts } = req.query;
    
    const includeOptions = [];
    
    // Incluir subcategorías si se solicita
    if (includeSubcategories === 'true') {
      includeOptions.push({
        model: Subcategory,
        as: 'subcategories',
        where: { isActive: true },
        required: false
      });
    }
    
    // Incluir productos si se solicita
    if (includeProducts === 'true') {
      includeOptions.push({
        model: Product,
        as: 'products',
        where: { isActive: true },
        required: false
      });
    }

    const categories = await Category.findAll({
      where: { isActive: true },
      include: includeOptions,
      order: [['name', 'ASC']]
    });

    res.json({
      message: "Categorías obtenidas exitosamente",
      data: categories,
      count: categories.length
    });

  } catch (error) {
    console.error('Error en index categories:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Obtener una categoría específica
async function show(req, res) {
  try {
    const { id } = req.params;
    const { includeSubcategories, includeProducts } = req.query;
    
    const includeOptions = [];
    
    if (includeSubcategories === 'true') {
      includeOptions.push({
        model: Subcategory,
        as: 'subcategories',
        where: { isActive: true },
        required: false
      });
    }
    
    if (includeProducts === 'true') {
      includeOptions.push({
        model: Product,
        as: 'products',
        where: { isActive: true },
        required: false
      });
    }

    const category = await Category.findByPk(id, {
      include: includeOptions
    });

    if (!category) {
      return res.status(404).json({
        error: "Categoría no encontrada"
      });
    }

    res.json({
      message: "Categoría obtenida exitosamente",
      data: category
    });

  } catch (error) {
    console.error('Error en show category:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Crear nueva categoría
async function store(req, res) {
  try {
    const { name, description, isActive = true } = req.body;

    // Validaciones
    if (!name) {
      return res.status(400).json({
        error: "El nombre de la categoría es requerido"
      });
    }

    // Verificar si ya existe una categoría con ese nombre
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({
        error: "Ya existe una categoría con ese nombre"
      });
    }

    const category = await Category.create({
      name,
      description,
      isActive
    });

    res.status(201).json({
      message: "Categoría creada exitosamente",
      data: category
    });

  } catch (error) {
    console.error('Error en store category:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Actualizar categoría
async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        error: "Categoría no encontrada"
      });
    }

    // Verificar duplicados de nombre si se está actualizando
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).json({
          error: "Ya existe una categoría con ese nombre"
        });
      }
    }

    await category.update({
      name: name || category.name,
      description: description !== undefined ? description : category.description,
      isActive: isActive !== undefined ? isActive : category.isActive
    });

    res.json({
      message: "Categoría actualizada exitosamente",
      data: category
    });

  } catch (error) {
    console.error('Error en update category:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Eliminar categoría (soft delete)
async function destroy(req, res) {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        error: "Categoría no encontrada"
      });
    }

    // Verificar si hay productos asociados
    const productsCount = await Product.count({ where: { categoryId: id, isActive: true } });
    if (productsCount > 0) {
      return res.status(400).json({
        error: `No se puede eliminar la categoría porque tiene ${productsCount} productos asociados`
      });
    }

    // Soft delete - marcar como inactiva
    await category.update({ isActive: false });

    // También marcar subcategorías como inactivas
    await Subcategory.update(
      { isActive: false },
      { where: { categoryId: id } }
    );

    res.json({
      message: "Categoría eliminada exitosamente"
    });

  } catch (error) {
    console.error('Error en destroy category:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};