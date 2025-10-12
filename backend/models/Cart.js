const { Model, DataTypes } = require("sequelize");

class Cart extends Model {
  static initModel(sequelize) {
    Cart.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        status: {
          type: DataTypes.ENUM("active", "ordered"),
          allowNull: false,
          defaultValue: "active",
        },
      },
      {
        sequelize,
        tableName: "Carts",
      }
    );
    return Cart;
  }
}

module.exports = Cart;
