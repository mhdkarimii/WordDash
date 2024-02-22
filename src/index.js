const express = require('express');
const path = require('path')
require('./db/mongoose');
const userRouter = require('./routers/user')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))


// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }

// })

// app.use((req, res, next) => {
//     res.status(503).send("Under maintenance")
// })


app.use(express.json())
app.use(userRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath));
})

 
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})