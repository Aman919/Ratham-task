import jwt from 'jsonwebtoken';
import config from './config.js';
import { User } from './models/user.js';

export const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user object to the request for further use in routes
    req.user = user;
    next(); // Move on to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
