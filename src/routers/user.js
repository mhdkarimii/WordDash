const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token});
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("Username or Email is already in use.");
        } else {
            res.status(500).send(error);
        }
    }
})

 


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/users', auth, async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/users/:username', async (req, res) => {
    const _username = req.params.username

    try {
        const user = await User.findOne({ username: _username })
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send()
    }

})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'email', 'password']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).res.send(error)
    }
})

module.exports = router