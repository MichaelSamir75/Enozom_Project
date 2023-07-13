const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./utils/database_functions')
const Game = require('./ActualGame/Game');
const cors = require('cors');


const app = express();
app.use(cors({ origin: '*' }));

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res)=> {
    res.send("hhhhhhhh");
})

const secret = 'b0283a0483891c85de12320deac3aef036bd83af2580df63dd25a8d0a420004c97cb773935031474de883754161d86f6657bf84c9476d56823e42c9eebe61907'

// Middleware function to require authentication
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// todo: change username to userid
///////////////
const requireAuth = async(req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' , nextPage: 'login'});

    try {
        const decoded = jwt.verify(token, secret);

        // Check if user ID in token matches ID of user in request
        if (req.params.username && req.params.username != decoded.username)
            return res.status(403).json({ message: 'Forbidden' });

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

app.get('/', (req, res) => {
    return res.send("michaelllllllll");
})

// Middleware function to require no authentication
const requireNoAuth = async(req, res, next) => {
    const token = req.headers.authorization;
    if (token)
        return res.status(403).json({ message: 'Forbidden' });
;
    next();
};

// // Register a new user
// app.post('/register', requireNoAuth, (req, res) => {
//     // Check if username is already taken
//     const username = req.body.username;
//     const password = req.body.password;
//     let userexist = false;
//     const ff = db.checkUsernameExist(username).then(userexist)
//     {
//         console.log(userexist);
//         if (userexist)
//             return res.status(409).json({message: 'Username already taken'});
//         return res.send('mmm');
//         // Create new user object and add to database
//         db.createUser(username, password);
//         res.status(201).json({ message: 'User registered successfully' });
//     }
// });
// by omar taha

app.post('/register', requireNoAuth, async (req, res) => {
    try {
        // Check if username is already taken
        const username = req.body.username;
        const password = req.body.password;
        const userexist = await db.checkUsernameExist(username);
        
        if (userexist) {
            return res.status(409).json({message: 'Username already taken'});
        } else {
            // Create new user object and add to database
            db.createUser(username, password);
            return res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Error registering user'});
    }
});

// Login as an existing user
app.post('/login', requireNoAuth, async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // If user not found, return 401 Unauthorized
    if (!(await db.checkCredentials(username, password)))
        return res.status(401).json({ message: 'Invalid username or password' });

    const myjson = await db.getUserRouteAndJson(username);
    myjson.status = 'successful'
    // Generate JWT and send to client
    const token = jwt.sign({ username: username }, secret);
    myjson.token = token;
    res.json({ myjson });
});

app.post('/createGame', requireAuth, async(req, res) => {
    const game = new Game();
    game.initNewGameObject(req.body.numOfPlayers, req.body.boardnumber)
    return res.send("successfull");
});

app.post('/joinGame', requireAuth, async(req, res) => {
    const game = new Game();
    game.initExistingGameObject(req.body.gameId)
    game.joinUser(req.body.userId);
    return res.send("successfull");
});

app.post('/throwDice', requireAuth, async(req, res) => {
    const game = new Game();
    game.initExistingGameObject(req.body.gameId);

    const userId = req.body.userId;

    if ((await game.checkCorrectUserTurn(userId)) === false)
        return res.status(401).send("Another User's Turn");

    const move = await (game.throwDice(userId));
    return res.send(move);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
