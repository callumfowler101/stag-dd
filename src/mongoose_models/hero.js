import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema({
  name: String,
  title: String,
  uuid: String,
  classname: String,
  info: String,
  luck: Number,
  wisdom: Number,
  agility: Number,
  speed: Number,
  fishing: Number,
  experience: Number,
})

console.log('bang')

// module.exports = mongoose.models
//   ? mongoose.models.heros
//   : mongoose.model('heros', heroSchema)
const HeroModel = mongoose.models.heros || mongoose.model('heros', heroSchema)
export default HeroModel
