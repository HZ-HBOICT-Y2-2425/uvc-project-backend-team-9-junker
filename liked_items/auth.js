import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).send({ error: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => { // Replace 'your-secret-key' with your actual secret key
    if (err) {
      return res.status(401).send({ error: 'Unauthorized, token is invalid' });
    }
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware or route handler
  });
};
