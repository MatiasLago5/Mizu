const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "ProductsCategories",
        timestamps: true,
      },
    );

    return Category;
  }

  // Método para obtener todas las subcategorías de esta categoría
  async getSubcategories() {
    const { Subcategory } = require("./index");
    return await Subcategory.findAll({
      where: { categoryId: this.id }
    });
  }

  // Método para obtener todos los productos de esta categoría
  async getProducts() {
    const { Product } = require("./index");
    return await Product.findAll({
      where: { categoryId: this.id }
    });
  }
}

module.exports = Category;