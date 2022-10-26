const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

const authenticate = require('./routes/auth')
const registerUser = require('./routes/signup')
const addArticle = require('./routes/addArticle')
const editArticle = require('./routes/editArticle')

const posts = require('./routes/posts')

app.use('/login', authenticate)
app.use('/signup', registerUser)
app.use('/postarticle', addArticle)
app.use('/editPost', editArticle)
app.use('/posts', posts)


const JWT_SECRET = process.env.JWT_SECRET
const CONNECTION_URL = process.env.CONNECTION_URL


app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Server</h1>")
})

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port : ${PORT}`)
    })
}).catch((error) => console.log(error.message))