const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

// Basic logger setup with Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'member-service' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // If no token, return unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is not valid, return forbidden
    req.user = user;
    next(); // proceed to the next middleware
  });
};

// Authorization Middleware
const checkMembership = (req, res, next) => {
  // Assuming req.user is populated by the authenticateToken middleware
  if (!req.user.isMember) {
    logger.log('info', 'Non-member user attempted to access a members-only route.');
    return res.status(403).json({ message: "Access denied. Members only." });
  }
  next();
};

// Rate Limiting
const memberRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a while.'
});

// Combining Middleware for Member Routes
const memberMiddleware = [authenticateToken, checkMembership, memberRateLimit];

// Express setup
const express = require('express');
const app = express();

app.use(express.json()); // Built-in middleware for JSON

// A sample member-only route using the combined middleware
app.get('/member-only', memberMiddleware, (req, res) => {
  res.json({ message: "Welcome to the members-only area!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
