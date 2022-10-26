const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const user = require('../model/user')

const JWT_SECRET = process.env.JWT_SECRET

router.post('/', async (req, res) => {

    console.log(req.body)

    const password = req.body.password, useremail = req.body.useremail
    const findUser = await user.findOne({ email: useremail })
    if (findUser) {
        if (await bcrypt.compare(password, findUser.password)) {
            const token = jwt.sign({
                id: findUser._id,
                useremail: findUser.email
            },
                JWT_SECRET)

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 6000000),
                httpOnly: true
            })
            console.log(token)
            console.log('successfully signed in')


            res.json({ status: 'ok', data: token })
        }
        else {

            res.json({ status: 'error', error: "invalid email or Password" })
        }

    }
    else {

        res.json({ status: 'error', error: "Invalid Credintials" })
    }






})

module.exports = router
