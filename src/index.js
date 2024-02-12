const express = require('express');
require('./db/mongoose');
const newLocal = './models/user';
const User = require(newLocal)

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then((user) => {
        console.log("User saved successfully:", user);
        res.send(user);
    }).catch((err) => {
        if (err.code === 11000) {
            console.log("Username is already in use.");
            res.status(400).send("Username is already in use.");
        } else {
            console.log(err);
            res.status(500).send("An error occurred while saving the user.", err);
        }
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(500).send(e)
    })
})


app.get('/users/:username', (req, res) => {


    // console.log(req.params)

    const _username = req.params.username


    User.findOne({ username: _username }).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})