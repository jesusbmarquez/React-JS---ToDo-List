const mongoose = require('mongoose');

//crear Schema
const TodoItemSchema = new mongoose.Schema({
  item:{
    type:String,
    required: true
  }
})

//exportar schema
module.exports = mongoose.model('todo', TodoItemSchema);