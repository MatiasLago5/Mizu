const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

// Rutas para productos
// Listar todos los productos
router.get("/", productController.index);

// Obtener producto específico por ID
router.get("/:id", productController.show);

// Crear un nuevo producto
router.post("/", auth, auth.requiereRol("admin"), productController.store);

// Actualizar un producto
router.put("/:id", auth, auth.requiereRol("admin"), productController.update);

// Actualizar parcialmente un producto
router.patch("/:id", auth, auth.requiereRol("admin"), productController.update);

// Eliminar producto
router.delete("/:id", auth, auth.requiereRol("admin"), productController.destroy);

// Actualizar stock del producto
router.patch("/:id/stock", auth, auth.requiereRol("admin"), productController.updateStock);

module.exports = router;
