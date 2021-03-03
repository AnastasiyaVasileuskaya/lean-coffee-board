const { v4: uuidv4 } = require('uuid')
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected'))
  .catch(error => console.error('Could not connect', error))

const app = express()

/*
app.use((req, res, next) => {
    //console.log(req.method, req.url)
    //res.end('Hello world')
    req.url === '/api/users'
    ? res.end('[{"name": "Melissa", "role": "student"}]')
    : next()
})

app.use((req, res, next) => {
    req.url === '/api/cards'
    ? res.end('[{"title": "First card"}]')
    : next()
})
*/

let users = []

app.use(express.json()) // add middleware for json data

app.get('/api/users', async (req, res) => {
  //User.find().then(users => res.json(users))
  res.json(await User.find()) //Automatische Fehlermeldung
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params
  res.json(await User.findOne({ id: id }))
})

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  //const index = users.findIndex(user => user.id === id)
  //users = [...users.slice(0, index), ...users.slice(index + 1)]
  users = users.filter(user => user.id === id)
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  //users.push(req.body)
  //res.json(req.body)
  /*users.push({ id: uuidv4(), name: req.body.name })
    res.json(req.body)*/
  /*newUser = { ...req.body, id: uuidv4() }
  users.push(newUser)
  res.json(newUser)
  */
  res.json(await User.create(req.body))
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First card' }])
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
