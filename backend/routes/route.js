import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { User } from '../models/user.js'
import Session from '../models/session.js'
import { authMiddleware } from '../authMiddleware.js';

const router = express.Router();

//Login route
router.post('/login', async (request, response) => {
    //get username and password from the request body
    const username = request.body.username;
    const password = request.body.password;

    //finding user in database
    const user = await User.findOne({ username });

    if (!user) {
        return response.status(401).json({ message: `User not found with the username: ${username}` });
    }

    //compare the db stored pass with input pass
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        return response.status(401).json({ message: "Incorrect Password" });
    }

    //Generate a JWT token
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1h" })

    response.json({ token });

});

//Get all free sessions 
router.get('/free', authMiddleware, async (request, response) => {
    //Get user from the token
    const user = request.user;

    //Get all free sessions
    const sessions = await Session.find({ isBooked: false });

    response.json(sessions);
});

//Book a session
router.post('/book', authMiddleware, async (request, response) => {
    const user = request.user;

    //get the session to be booked
    const session = await Session.findOne({ _id: request.body.sessionId });

    if (!session) {
        return response.status(404).json({ message: 'Session not found' });
    }
    if (session.isBooked) {
        return response.status(409).json({ message: 'Session is already booked' });
    }

    //Book the session
    session.isBooked = true
    session.bookedBy = user._id;
    await session.save();

    response.json({ message: 'Session booked successfully' });
});

//Pending session id
router.get('/pending', authMiddleware, async (request, response) => {
    const user = request.user;

    //Get all pending sessions
    const sessions = await Session.find({ isBooked: true, bookedBy: user._id });

    response.json(sessions);
})


router.post('/addUser', async (request, response) => {
    try {
        const { username, password } = request.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(409).json({ message: "User already exists" });
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username,
            password: hashedPassword,
            role: 'student'
        });
        await newUser.save();

        response.status(201).json({ message: "user added successfully " });
    } catch (error) {
        console.error("Error adding user: ", error),
            response.status(500).json({ message: "Internal Server Error" })
    }
});

export default router;
