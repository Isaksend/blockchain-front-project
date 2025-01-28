const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = express.Router();

const DATABASE = './database.json';
const POLLS_DB = "./polls.json";
const SECRET_KEY="fsejgkjsrgkjgf"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded user data to the request
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token." });
    }
};


const readDatabase = () => JSON.parse(fs.readFileSync(DATABASE));
const writeDatabase = (data) =>
    fs.writeFileSync(DATABASE, JSON.stringify(data, null, 2));

const readPollsDatabase = () => JSON.parse(fs.readFileSync(POLLS_DB));
const writePollsDatabase = (data) =>
    fs.writeFileSync(POLLS_DB, JSON.stringify(data, null, 2));



// Register User
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const users = readDatabase();

    // Check if user already exists
    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add user to database
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
    };
    users.push(newUser);
    writeDatabase(users);

    res.status(201).json({ message: 'User registered successfully.' });
});

// Sign In User
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log('SECRET_KEY:', SECRET_KEY);
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const users = readDatabase();

    // Find user
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    console.log('Email:', email, 'Password:', password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials.' });
    }

    try {
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        console.log('Generated token:', token);
        res.json({ message: 'Sign in successful!', token });
    } catch (err) {
        console.error('Error generating token:', err.message);
        console.log('Request received:', req.body);
        console.log('SECRET_KEY:', SECRET_KEY);
        res.status(500).json({ error: 'Error generating token.' });
    }
});

router.get('/protected', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Access granted.', user: decoded });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token.' });
    }
});

router.get("/profile", verifyToken, (req, res) => {
    const { id, name, email } = req.user;
    res.json({
        id,
        name,
        email,
    });
});

// Protected Route: Fetch User Polls
router.get("/user-polls", verifyToken, (req, res) => {
    const userId = req.user.id;
    const polls = readPollsDatabase();

    // Filter polls created by the logged-in user
    const userPolls = polls.filter((poll) => poll.userId === userId);

    res.json(userPolls);
});

// Protected Route: Create a Poll
router.post("/create-poll", verifyToken, (req, res) => {
    const { title, description, questions } = req.body;

    if (!title || !description || !questions || !Array.isArray(questions)) {
        return res.status(400).json({ error: "Invalid poll data." });
    }

    const polls = readPollsDatabase();

    const newPoll = {
        id: polls.length + 1,
        userId: req.user.id, // Associate poll with the logged-in user
        title,
        description,
        questions,
        date: new Date().toISOString(),
    };

    polls.push(newPoll);
    writePollsDatabase(polls);

    res.status(201).json({ message: "Poll created successfully.", poll: newPoll });
});


module.exports = router;
