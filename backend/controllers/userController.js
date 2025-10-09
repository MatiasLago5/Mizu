const { User } = require("../models");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos"
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: "Este Email ya está registrado"
      });
    }
    
    const user = await User.create({
      name,
      email,
      password,
      role: "usuario",
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: user.toSafeObject(),
      token
    });

  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "email y contraseña requeridos"
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: "Credenciales inválidas"
      });
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Credenciales inválidas"
      });
    }

    const token = generateToken(user);
    res.json({
      message: "Login exitoso",
      user: user.toSafeObject(),
      token
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

async function profile(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json({
      user: user.toSafeObject()
    });

  } catch (error) {
    console.error('Error en profile:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Contraseña actual y nueva contraseña son requeridas"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "La nueva contraseña debe tener al menos 6 caracteres"
      });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    const isValidPassword = await user.validatePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        error: "La contraseña actual es incorrecta"
      });
    }
    await user.update({ password: newPassword });

    res.json({
      message: "Contraseña actualizada exitosamente"
    });

  } catch (error) {
    console.error('Error en changePassword:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

async function index(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuarios"
    });
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuario"
    });
  }
}

async function store(req, res) {
  return register(req, res);
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body; 

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    await user.update({ name, email });
    
    res.json({
      message: "Usuario actualizado exitosamente",
      user: user.toSafeObject()
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar usuario"
    });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    await user.destroy();
    
    res.json({
      message: "Usuario eliminado exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar usuario"
    });
  }
}

module.exports = {
  register,
  login,
  profile,
  changePassword,
  index,
  show,
  store,
  update,
  destroy,
};
