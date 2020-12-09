/* IMPORTS */
const express = require('express');
const cors = require('cors');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

/* SETUP & CONFIG*/
const server = express();
server.use(cors());
server.use(express.json());
server.use(logger);


/* ROUTERS */
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


// Prop up server on port 5000
server.listen(5000, () => {
    console.log('Listening on port 5000')
})

// MIDDLEWARE
function logger(req, res, next) {
    console.log(`${req.method} request on ${req.url} at ${new Date().toUTCString()}`);
    next();
};