"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.ENUM("usuario", "admin"),
      allowNull: false,
      defaultValue: "usuario",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Users", "role");

    const dialect = queryInterface.sequelize.getDialect();
    if (dialect === "postgres") {
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_Users_role";'
      );
    }
  },
};
