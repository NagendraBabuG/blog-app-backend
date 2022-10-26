const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const user = require('../model/user')

const JWT_SECRET = process.env.JWT_SECRET


router.post('/', async (req, res) => {
    console.log('sign up method')
    console.log(req.body)
    if (!req.body) {
        return res.json({ status: 'error' })
    }
    const username = req.body.username, password = req.body.password, useremail = req.body.useremail

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'invalid username' })
    }
    if (!password || typeof password !== 'string') {
        return res.json({ status: 'error', error: 'invalid password' })
    }
    if (!useremail) return res.json({ status: 'error', error: 'useremail is required' })
    if (password.length < 6) {
        return res.json({ status: 'error', error: 'Password is too small, should be atleast 6 Characters' })
    }


    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('hashed Password ', hashedPassword)

    try {
        const createUser = await user.create({
            username: username,
            useremail: useremail,
            password: hashedPassword


        })


    }
    catch (error) {
        console.log(error)
        if (error.code == 11000) {
            res.json({ status: "error", error: "duplicate username or email is already registered" })

        }
        else {
            res.json({ status: "error" })
        }
        return;

    }
    console.log('Successfully Created User!!!')


    res.json({ status: "ok" })
})

module.exports = router