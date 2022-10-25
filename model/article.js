const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: { type: String, required: true, trim: true, minlength: 3 },
        body: { type: String, required: true, trim: true },
        author: {
            type: String,
            required: true
        },
        // img: {
        //     data: Buffer,
        //     contentType: String
        // },

        authorId: {
            type: mongoose.Schema.Types.ObjectId, default: null
        },
        date: { type: Date, required: true },
        comments: [String]

    },
    { timestamps: true }
);

const articles = mongoose.model("Articles", articleSchema);

module.exports = articles;