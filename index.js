/* IMPORTS */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

/* SETUP & CONFIG*/
const server = express();
server.use(cors());
server.use(express.json());
server.use(logger);

// Read the port from the server environment. If it isn't there, resort to 5000.
const port = process.env.PORT || 5000;


/* ROUTERS */
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


// Prop up server on port 5000
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// MIDDLEWARE
function logger(req, res, next) {
    console.log(`${req.method} request on ${req.url} at ${new Date().toUTCString()}`);
    next();
};