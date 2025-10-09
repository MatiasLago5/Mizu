const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const subcategoryRoutes = require("./subcategoryRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/subcategories", subcategoryRoutes);
};
