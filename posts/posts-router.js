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
    .catch(err => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    posts.findPostComments(id)
    .then(comments => {
        if(comments.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{
            res.status(200).json(comments)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

router.post('/', (req, res) => {
    newPost = req.body

    if(!newPost.title || !newPost.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else{
        posts.insert(newPost)
        .then(id => {
            res.status(201).json(newPost)
        })
    }
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id
    newComment = req.body
    
    posts.findById(id)
    .then(post => {
        if(post.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{ 
            if(!newComment.text){
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            }
            else{
                posts.insertComment(newComment)
                .then(id => {
                    res.status(201).json(newComment)
                })
            }     

        }
    })

})

router.delete('/:id', (req, res) => {
    id = req.params.id

    posts.findById(id)
    .then(post => {
        if(post.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{
            posts.remove(id)
            .then(num => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json({ error: "The post could not be removed" })
            })
        }
    })

})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body

    if(!changes.title || !changes.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        posts.findById(id)
        .then(post => {
            if(post.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                posts.update(id, changes)
                .then(num => {
                    res.status(200).json(changes)
                })
                .catch(err => {
                    res.status(500).json({ error: "The post information could not be modified." })
                })
            }
        })
        
    }
})
module.exports = router