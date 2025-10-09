const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");
const auth = require("../middleware/auth");

// Rutas para subcategorías de productos
// Listar todas las subcategorías
router.get("/", subcategoryController.index);

// Obtener subcategoría específica por ID
router.get("/:id", subcategoryController.show);

// Crear nueva subcategoría
router.post("/", auth, auth.requiereRol("admin"), subcategoryController.store);

// Actualizar subcategoría
router.put("/:id", auth, auth.requiereRol("admin"), subcategoryController.update);

// Actualizar parcialmente una subcategoría
router.patch("/:id", auth, auth.requiereRol("admin"), subcategoryController.update);

// Eliminar una subcategoría específica
router.delete("/:id", auth, auth.requiereRol("admin"), subcategoryController.destroy);

module.exports = router;