const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authRequired = (req, res, next) => {
  // 1. Extract token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Authorization header missing',
      solution: 'Include "Authorization: Bearer <token>" header'
    });
  }

  // 2. Verify token format
  const [bearer, token] = authHeader.split(' ');
  
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      error: 'Invalid token format',
      expected_format: 'Bearer <token>',
      received: authHeader
    });
  }

  try {
    // 3. Verify token with additional checks
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'], // Specify allowed algorithm
      ignoreExpiration: false // Explicitly check expiration
    });

    // 4. Add additional security checks
    if (!decoded.sub || !decoded.role) {
      return res.status(401).json({
        success: false,
        error: 'Malformed token payload',
        required_fields: ['sub (user ID)', 'role']
      });
    }

    // 5. Attach user data to request
    req.user = {
      id: decoded.sub,
      role: decoded.role,
      // Add other necessary fields from token
      ...decoded
    };

    // 6. Optional: Add security headers
    res.set('X-Authenticated-User', decoded.sub);
    
    next();
  } catch (error) {
    // 7. Detailed error responses
    let status = 401;
    let errorMessage = 'Invalid token';
    
    if (error.name === 'TokenExpiredError') {
      status = 403;
      errorMessage = 'Token expired';
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Malformed token';
    }

    return res.status(status).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      action: status === 403 ? 'Refresh your token' : 'Login to get new token'
    });
  }
};

// Optional role-based access control
exports.roleRequired = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
        required_roles: allowedRoles,
        current_role: req.user?.role
      });
    }
    next();
  };
};