const { Model, DataTypes } = require("sequelize");

class CartItem extends Model {
  static initModel(sequelize) {
    CartItem.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        quantity: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
          validate: {
            min: 1,
          },
        },
        unitPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            min: 0,
          },
        },
      },
      {
        sequelize,
        tableName: "CartItems",
      }
    );
    return CartItem;
  }
}

module.exports = CartItem;
