const express = require('express')
const app = express()
const routesApi = require('./routes/routes')
const cors = require('cors');
const connectDB = require('./config/db')
connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/v1/user',routesApi)
app.get('/',(req,res)=>{
    res.json({msg:"server is running"})
})

app.listen(3400)