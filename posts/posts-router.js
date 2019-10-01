const express = require('express')

const posts = require('../data/db')

router = express.Router()

router.get('/', (req, res) => {
    posts.find()
    .then(dbPosts => {
        res.status(200).json(dbPosts)
    })

    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    posts.findById(id)
    .then(post => {
        if (post.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else {
            res.json(post)
        }
    })
    .catch(res.status(500).json({ error: "The post information could not be retrieved." }))
})

router.get('/', (req, res) => {
    
})

router.get('/', (req, res) => {
    
})

module.exports = router