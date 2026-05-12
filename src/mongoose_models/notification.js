const mongoose = require('mongoose')
const { Schema } = mongoose

const notificationSchema = new Schema({
  title: String,
  type: String,
  body: String,
  read: Boolean,
  uuid: String,
  userUuid: String,
})

module.exports = mongoose.model('notification', notificationSchema)
