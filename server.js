const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
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


const JWT_SECRET = '2ayisadzsldszaladlweoewqorwqoqwlaaxlweqzcvnmfda@#$%@lldladsdalwoerutqql/a/s.ccmcvncvldsaw'
const CONNECTION_URL = 'mongodb+srv://nagendrababug:gnb0009@cluster0.wwsjwxe.mongodb.net/?retryWrites=true&w=majority';

app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Server</h1>")
})

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port : ${PORT}`)
    })
}).catch((error) => console.log(error.message))