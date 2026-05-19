import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  title: String,
  type: String,
  body: String,
  read: Boolean,
  uuid: String,
  userUuid: String,
})

const NotificationModel =
  mongoose.models.notification ||
  mongoose.model('notification', notificationSchema)

export default NotificationModel
