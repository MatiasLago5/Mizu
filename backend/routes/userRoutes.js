const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Rutas para usuarios
// Registro de nuevo usuario
router.post("/register", userController.register);

// Login de usuario
router.post("/login", userController.login);

// Obtener perfil del usuario (requiere autenticación)
router.get("/profile", auth, userController.profile);

// Cambiar contraseña del usuario
router.put("/change-password", auth, userController.changePassword);

// Listar todos los usuarios 
router.get("/", auth, auth.requiereRol("admin"), userController.index);

// Obtener usuario específico por ID
router.get("/:id", auth, auth.requiereRol("admin"), userController.show);

// Crear nuevo usuario 
router.post("/", auth, auth.requiereRol("admin"), userController.store);

// Actualizar usuario
router.put("/:id", auth, auth.requiereRol("admin"), userController.update);

// Actualizar parcialmente usuario
router.patch("/:id", auth, auth.requiereRol("admin"), userController.update);

// Eliminar usuario
router.delete("/:id", auth, auth.requiereRol("admin"), userController.destroy);

module.exports = router;
