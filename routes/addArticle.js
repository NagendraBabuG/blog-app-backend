const router = require("express").Router()
let Post = require("../model/article")

router.route("/").post(async (req, res) => {
    const { title, body, author, id } = req.body;
    const date = Date.parse(req.body.date);

    const comments = [];


    const newPost = new Post({
        title,
        body,
        author,
        id,
        date,
        comments,
    })
    newPost
        .save()
        .then(() => res.json("Post Created..."))
        .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router