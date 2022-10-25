const router = require("express").Router()
let Post = require("../model/article")

router.route("/").post((req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            post.title = req.body.title
            post.body = req.body.body
            post.author = req.body.author
            post.date = Date.parse(req.body.date)
            post.comments = req.body.comments

            post.save()
                .then(() => res.json("Post Edited"))
                .catch((err) => res.status(400).json("Error: " + err))
        })
        .catch((err) => res.status(400).json("Error: " + err))
});

module.exports = router