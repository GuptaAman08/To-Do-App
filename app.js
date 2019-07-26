const express = require('express')
var todoController = require('./Controllers/todoController')

// set up the express app
var app = express()

// set up the template Engine
app.set('view engine', 'ejs')

//to serve static files
app.use(express.static('./public'))

// fire controllers
todoController(app)

// Listen to port 
app.listen(3000)
console.log('Listening to port 3000........')