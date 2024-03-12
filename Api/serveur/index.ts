import express from 'express'

var cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json())

//! Routes
const user = require('../Routes/User/User')

app.use('/user', user)

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)