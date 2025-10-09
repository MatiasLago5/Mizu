const { Category, Subcategory, Product } = require("../models");

// Obtener todas las subcategorías
async function index(req, res) {
  try {
    const { categoryId, includeCategory, includeProducts } = req.query;
    
    const whereCondition = { isActive: true };
    if (categoryId) {
      whereCondition.categoryId = categoryId;
    }
    
    const includeOptions = [];
    
    // Incluir categoría padre si se solicita
    if (includeCategory === 'true') {
      includeOptions.push({
        model: Category,
        as: 'category',
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

    const subcategories = await Subcategory.findAll({
      where: whereCondition,
      include: includeOptions,
      order: [['name', 'ASC']]
    });

    res.json({
      message: "Subcategorías obtenidas exitosamente",
      data: subcategories,
      count: subcategories.length
    });

  } catch (error) {
    console.error('Error en index subcategories:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Obtener una subcategoría específica
async function show(req, res) {
  try {
    const { id } = req.params;
    const { includeCategory, includeProducts } = req.query;
    
    const includeOptions = [];
    
    if (includeCategory === 'true') {
      includeOptions.push({
        model: Category,
        as: 'category',
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

    const subcategory = await Subcategory.findByPk(id, {
      include: includeOptions
    });

    if (!subcategory) {
      return res.status(404).json({
        error: "Subcategoría no encontrada"
      });
    }

    res.json({
      message: "Subcategoría obtenida exitosamente",
      data: subcategory
    });

  } catch (error) {
    console.error('Error en show subcategory:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Crear nueva subcategoría
async function store(req, res) {
  try {
    const { name, categoryId, description, isActive = true } = req.body;

    // Validaciones
    if (!name || !categoryId) {
      return res.status(400).json({
        error: "El nombre y categoryId son requeridos"
      });
    }

    // Verificar que la categoría existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({
        error: "La categoría especificada no existe"
      });
    }

    // Verificar si ya existe una subcategoría con ese nombre en la misma categoría
    const existingSubcategory = await Subcategory.findOne({ 
      where: { name, categoryId } 
    });
    if (existingSubcategory) {
      return res.status(400).json({
        error: "Ya existe una subcategoría con ese nombre en esta categoría"
      });
    }

    const subcategory = await Subcategory.create({
      name,
      categoryId,
      description,
      isActive
    });

    // Incluir la categoría en la respuesta
    const subcategoryWithCategory = await Subcategory.findByPk(subcategory.id, {
      include: [{
        model: Category,
        as: 'category'
      }]
    });

    res.status(201).json({
      message: "Subcategoría creada exitosamente",
      data: subcategoryWithCategory
    });

  } catch (error) {
    console.error('Error en store subcategory:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Actualizar subcategoría
async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, categoryId, description, isActive } = req.body;

    const subcategory = await Subcategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({
        error: "Subcategoría no encontrada"
      });
    }

    // Si se está cambiando la categoría, verificar que existe
    if (categoryId && categoryId !== subcategory.categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({
          error: "La categoría especificada no existe"
        });
      }
    }

    // Verificar duplicados de nombre si se está actualizando
    if (name && (name !== subcategory.name || categoryId !== subcategory.categoryId)) {
      const finalCategoryId = categoryId || subcategory.categoryId;
      const existingSubcategory = await Subcategory.findOne({ 
        where: { name, categoryId: finalCategoryId } 
      });
      if (existingSubcategory && existingSubcategory.id !== id) {
        return res.status(400).json({
          error: "Ya existe una subcategoría con ese nombre en esta categoría"
        });
      }
    }

    await subcategory.update({
      name: name || subcategory.name,
      categoryId: categoryId || subcategory.categoryId,
      description: description !== undefined ? description : subcategory.description,
      isActive: isActive !== undefined ? isActive : subcategory.isActive
    });

    // Incluir la categoría en la respuesta
    const updatedSubcategory = await Subcategory.findByPk(id, {
      include: [{
        model: Category,
        as: 'category'
      }]
    });

    res.json({
      message: "Subcategoría actualizada exitosamente",
      data: updatedSubcategory
    });

  } catch (error) {
    console.error('Error en update subcategory:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

// Eliminar subcategoría (soft delete)
async function destroy(req, res) {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({
        error: "Subcategoría no encontrada"
      });
    }

    // Verificar si hay productos asociados
    const productsCount = await Product.count({ where: { subcategoryId: id, isActive: true } });
    if (productsCount > 0) {
      return res.status(400).json({
        error: `No se puede eliminar la subcategoría porque tiene ${productsCount} productos asociados`
      });
    }

    // Soft delete - marcar como inactiva
    await subcategory.update({ isActive: false });

    res.json({
      message: "Subcategoría eliminada exitosamente"
    });

  } catch (error) {
    console.error('Error en destroy subcategory:', error);
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