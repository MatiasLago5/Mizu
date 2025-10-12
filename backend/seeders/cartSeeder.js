const { Cart, CartItem, Product, User } = require("../models");

module.exports = async () => {
  const admin = await User.findOne({ where: { email: "admin@mizu.com" } });
  const product = await Product.findOne();
  if (!admin || !product) return;

  const cart = await Cart.create({ userId: admin.id, status: "active" });
  await CartItem.create({
    cartId: cart.id,
    productId: product.id,
    quantity: 1,
    unitPrice: product.price,
  });

  console.log("[Database] Seeder de Cart ejecutado.");
};