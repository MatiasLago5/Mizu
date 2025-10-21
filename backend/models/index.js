const { Sequelize } = require("sequelize");

let sequelize;
if (process.env.DB_CONNECTION === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || 'dev.sqlite',
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      logging: false, // Para que no aparezcan mensajes en consola.
    },
  );
}

// Requerir todos los modelos:
const User = require("./User");
const Product = require("./Products");
const Category = require("./Category");
const Subcategory = require("./Subcategory");

// Inicializar todos los modelos:
User.initModel(sequelize);
Product.initModel(sequelize);
Category.initModel(sequelize);
Subcategory.initModel(sequelize);

// Definir las relaciones entre los modelos:
Category.hasMany(Subcategory, {
  foreignKey: 'categoryId',
  as: 'subcategories',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Relaciones de Subcategory
Subcategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Subcategory.hasMany(Product, {
  foreignKey: 'subcategoryId',
  as: 'products',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

// Relaciones de Product
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Product.belongsTo(Subcategory, {
  foreignKey: 'subcategoryId',
  as: 'subcategory',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Subcategory,
};
