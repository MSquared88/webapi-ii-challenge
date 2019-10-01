const express = require('express')

const server = express()

const postsRouter = require('./posts/posts-router')

server.use(express.json())

const port = 8888

server.get('/', (req, res) => {
    res.send(
        '<h1>Server is Running</h1>'
    )
})

server.use('/api/posts',postsRouter)


server.listen(port, () =>{
    console.log(`\n ** server is listening on port ${8888} **\n`)
})