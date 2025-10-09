const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");

// Rutas para categorías de productos
// Listar todas las categorías
router.get("/", categoryController.index);

// Obtener categoría específica por ID
router.get("/:id", categoryController.show);

// Crear nueva categoría. "auth" significa que requiere autenticación
router.post("/", auth, auth.requiereRol("admin"), categoryController.store);

// Actualizar categoría
router.put("/:id", auth, auth.requiereRol("admin"), categoryController.update);

// Actualizar parcialmente categoría
router.patch("/:id", auth, auth.requiereRol("admin"), categoryController.update);

// Eliminar categoría
router.delete("/:id", auth, auth.requiereRol("admin"), categoryController.destroy);


module.exports = router;