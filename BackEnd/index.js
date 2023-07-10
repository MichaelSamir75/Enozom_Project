const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const db = require('./utils/database_functions');

// Secret key for JWT
const secretKey = 'mysecretkey';

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Define an endpoint for POST requests to the /api/login URL
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // TODO: Implement logic to check if username and password are valid
    // For example, you might check them against a database
    if (!db.checkCredentials(username, password))
        res.status(403).send("Wrond username or password");

    if (username === 'myusername' && password === 'mypassword') {
        // If the username and password are valid, create a JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

// Define a protected endpoint for GET requests to the /api/protected URL
app.get('/api/protected', (req, res) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const { username } = decoded;
        res.json({ message: `Welcome ${username}! This is a protected endpoint.` });
    });
});


app.post('/register', (req, res) => {
    // Get the user data from the request body
    const { username, password } = req.body;

    // TODO: Validate the user input
    if (db.checkUsernameExist(username) == true)
    {
        res.send(false);
        return;
    }

    // TODO: Save the user data to the database
    db.createUser(username, password);

    // Render a success message
    //res.render('register-success', { username });
    res.send(true);
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});