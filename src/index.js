const express = require('express');
require('./db/mongoose');
const newLocal = './models/user';
const User = require(newLocal)

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("Username is already in use.");
        } else {
            res.status(500).send(error);
        }
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(500).send(error)
    }
})


app.get('/users/:username', async (req, res) => {
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

    // User.findOne({ username: _username }).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})