/* IMPORTS */
const server = require('./server');
const userRouter = require('./users/userRouter');

/* ROUTERS */
server.use('/api/users', userRouter)

// Prop up server on port 5000
server.listen(5000, () => {
    console.log('Listening on port 5000')
})