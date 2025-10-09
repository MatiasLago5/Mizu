const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static initModel(sequelize) {
    User.init(
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("usuario", "admin"),
          allowNull: false,
          defaultValue: "usuario",
          validate: {
            isIn: [["usuario", "admin"]],
          },
        },
      },
      {
        sequelize,
        tableName: "Users",
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
            }
          },
          beforeUpdate: async (user) => {
            if (user.changed('password')) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
            }
          }
        }
      },
    );
    return User;
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  toSafeObject() {
    const { password, ...userWithoutPassword } = this.toJSON();
    return userWithoutPassword;
  }
}

module.exports = User;
