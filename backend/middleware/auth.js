const jwt = require('jsonwebtoken');

const authz = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acceso requerido' 
      });
    }

    // Verificar token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ 
          error: 'Token inválido o expirado' 
        });
      }
      // Agregar información del usuario al request
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
};

authz.requiereRol = (...roles) => {
  const rolesPermitidos = roles.flat();

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        error: "Acceso denegado: rol no especificado",
      });
    }

    if (!rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({
        error: "Acceso denegado: permisos insuficientes",
      });
    }

    return next();
  };
};

module.exports = authz;