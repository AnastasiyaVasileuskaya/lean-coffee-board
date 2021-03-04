const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const Card = require('./models/Card')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected'))
  .catch(error => console.error('Could not connect', error))

const app = express()

app.use(express.json())

// Users

app.use('/api/users', require('./routes/users'))

// Cards

app.use('/api/cards', require('./routes/cards'))

app.use((err, req, res, next) => {
  console.log(err.message)
  res.json({ error: err.messag })
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
