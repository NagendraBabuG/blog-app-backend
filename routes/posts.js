const router = require("express").Router()
let Post = require("../model/article")

router.route("/").post((req, res) => {
    Post.find()
        .then((posts) => res.json(posts))
        .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router