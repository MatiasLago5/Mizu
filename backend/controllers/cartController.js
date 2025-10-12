const { sequelize, Cart, CartItem, Product } = require("../models");

async function findOrCreateActiveCart(userId, transaction) {
  const [cart] = await Cart.findOrCreate({
    where: { userId, status: "active" },
    defaults: { userId, status: "active" },
    transaction,
  });
  return cart;
}

async function loadActiveCart(userId) {
  return Cart.findOne({
    where: { userId, status: "active" },
    include: [
      {
        model: CartItem,
        as: "items",
        include: [{
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "imageUrl"],
        }],
      },
    ],
    order: [[{ model: CartItem, as: "items" }, "createdAt", "ASC"]],
  });
}

async function getActiveCart(req, res) {
  try {
    const cart = await loadActiveCart(req.user.id);

    if (!cart) {
      return res.json({
        message: "Carrito vacío",
        data: { items: [], total: 0 },
      });
    }

    const total = cart.items.reduce(
      (acc, item) => acc + Number(item.unitPrice) * item.quantity,
      0
    );

    res.json({
      message: "Carrito obtenido exitosamente",
      data: { cart, total },
    });
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function addItem(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        error: "Se requiere productId y quantity debe ser mayor a 0",
      });
    }

    const product = await Product.findByPk(productId, { transaction });
    if (!product) {
      await transaction.rollback();
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const cart = await findOrCreateActiveCart(req.user.id, transaction);

    const [item, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId },
      defaults: {
        cartId: cart.id,
        productId,
        quantity,
        unitPrice: product.price,
      },
      transaction,
    });

    if (!created) {
      item.quantity += quantity;
      await item.save({ transaction });
    }

    await transaction.commit();
    return await getActiveCart(req, res);
  } catch (error) {
    await transaction.rollback();
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateItem(req, res) {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        error: "La cantidad debe ser mayor a 0",
      });
    }

    const cart = await Cart.findOne({
      where: { userId: req.user.id, status: "active" },
    });

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const item = await CartItem.findOne({
      where: { id: itemId, cartId: cart.id },
    });

    if (!item) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    item.quantity = quantity;
    await item.save();

    return await getActiveCart(req, res);
  } catch (error) {
    console.error("Error al actualizar item del carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function removeItem(req, res) {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({
      where: { userId: req.user.id, status: "active" },
    });

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const item = await CartItem.findOne({
      where: { id: itemId, cartId: cart.id },
    });

    if (!item) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    await item.destroy();

    return await getActiveCart(req, res);
  } catch (error) {
    console.error("Error al eliminar item del carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function clearCart(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id, status: "active" },
      transaction,
    });

    if (!cart) {
      await transaction.rollback();
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    await CartItem.destroy({ where: { cartId: cart.id }, transaction });
    await transaction.commit();

    return res.json({ message: "Carrito vaciado" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getActiveCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  renderActiveCart,
};
