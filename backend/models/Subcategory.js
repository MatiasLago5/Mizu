const { Model, DataTypes } = require("sequelize");

class Subcategory extends Model {
  static initModel(sequelize) {
    Subcategory.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'ProductsCategories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
        modelName: "Subcategory",
        tableName: "ProductsSubcategories", // Coincide con la migración
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ['name', 'categoryId']
          }
        ]
      },
    );

    return Subcategory;
  }

  // Método para obtener la categoría padre
  async getCategory() {
    const { Category } = require("./index");
    return await Category.findByPk(this.categoryId);
  }

  // Método para obtener todos los productos de esta subcategoría
  async getProducts() {
    const { Product } = require("./index");
    return await Product.findAll({
      where: { subcategoryId: this.id }
    });
  }
}

module.exports = Subcategory;