const express = require('express')
const app = express()
const port = 4500
const cors = require('cors')

app.use(cors())

const apiRouter = require('./routes/index')

app.use(express.json())

app.use('/api/v1',apiRouter)
app.listen(port)