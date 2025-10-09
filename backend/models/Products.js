const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
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
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            min: 0,
          }
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
        subcategoryId: {
          type: DataTypes.UUID,
          allowNull: true, // Un producto puede no tener subcategoría
          references: {
            model: 'ProductsSubcategories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            min: 0,
          }
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "Products", // Coincide con la migración
        timestamps: true,
      },
    );

    return Product;
  }

  // Método para obtener la categoría del producto
  async getCategory() {
    const { Category } = require("./index");
    return await Category.findByPk(this.categoryId);
  }

  // Método para obtener la subcategoría del producto
  async getSubcategory() {
    if (!this.subcategoryId) return null;
    const { Subcategory } = require("./index");
    return await Subcategory.findByPk(this.subcategoryId);
  }

  // Método para verificar si hay stock disponible
  hasStock(quantity = 1) {
    return this.stock >= quantity;
  }

  // Método para reducir stock
  async reduceStock(quantity) {
    if (!this.hasStock(quantity)) {
      throw new Error('Stock insuficiente');
    }
    this.stock -= quantity;
    await this.save();
    return this;
  }

  // Método para aumentar stock
  async increaseStock(quantity) {
    this.stock += quantity;
    await this.save();
    return this;
  }
}

module.exports = Product;
