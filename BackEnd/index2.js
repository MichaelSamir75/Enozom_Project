const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./utils/database_functions')

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory database of users (for demo purposes only)
const users = [];

// Middleware function to require authentication
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });


    try {
        const decoded = jwt.verify(token, 'your_secret_key');

        // Check if user ID in token matches ID of user in request
        if (req.params.username && req.params.username !== decoded.username)
            return res.status(403).json({ message: 'Forbidden' });

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware function to require no authentication
const requireNoAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token)
        return res.status(403).json({ message: 'Forbidden' });

    next();
};

// Register a new user
app.post('/register', requireNoAuth, (req, res) => {
    // Check if username is already taken
    const username = req.body.username;
    const password = req.body.password;

    if (db.checkUserExist(username))
        return res.status(409).json({ message: 'Username already taken' });

    // Create new user object and add to database
    const user = {
        username: req.body.username,
        password: password
    };

    db.createUser(username, password);

    res.status(201).json({ message: 'User registered successfully' });
});

// Login as an existing user
app.post('/login', requireNoAuth, (req, res) => {

    // If user not found, return 401 Unauthorized
    if (db.checkUserExist(username))
        return res.status(401).json({ message: 'Invalid username or password' });

    if (!db.chechCredentials(username, password))
        return res.status(401).json({ message: 'Invalid username or password' });

    // Generate JWT and send to client
    const token = jwt.sign({ username: user.username }, 'your_secret_key');
    res.json({ token });
});

// Protected route that requires authentication
app.get('/protected/:userId', requireAuth, (req, res) => {
    const user = users.find(user => user.id === req.user.id);

    if (!user)
        return res.status(401).json({ message: 'Unauthorized' });

    res.json({ message: `Hello, ${user.username}! This is a protected resource.` });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


