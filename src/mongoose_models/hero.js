const mongoose = require('mongoose')
const { Schema } = mongoose

const heroSchema = new Schema({
  name: String,
  uuid: String,
  classname: String,
  info: String,
  stats: {
    luck: Number,
    wisdom: Number,
    agility: Number,
    speed: Number,
    fishing: Number,
    experience: Number,
  },
})

console.log('bang')

module.exports = mongoose.model('heros', heroSchema)
