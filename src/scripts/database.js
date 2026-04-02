const mongoose = require('mongoose')
const Hero = require('../mongoose_models/hero.js')
const Notification = require('../mongoose_models/notification.js')

// console.log(Hero)

const uri = process.env.DATABASE_URI

// Hero
const initCharacterToDb = async (_heroSchema, _uuid) => {
  const hero = new Hero()

  for (const [key, value] of Object.entries(_heroSchema)) {
    // console.log(`${key}: ${value}`)
    hero[key] = value
  }

  console.log(hero)
  await hero.save()
  console.log('character saved')
}

const initDB = async () => {
  console.log('connecting to mongo')

  mongoose.connect(uri)
  mongoose.connection.once('open', () => {
    console.log('mongodb connected')
  })

  // initCharacterToDb()
}

const addDataToDb = () => {}

const getCharacterFromDb = (uuid) => {
  return new Promise(async (res, rej) => {
    console.log(uuid)
    const data = await Hero.findOne({ uuid })
    res(data)
  })
}

const entryExists = (uuid) => {
  return new Promise(async (res, rej) => {
    console.log(uuid)
    const result = await Hero.exists({ uuid })
    res(result)
  })
}

const getAllCharactersFromDb = () => {
  return new Promise(async (res, rej) => {
    const data = await Hero.find({})
    res(data)
  })
}

const updateCharacterStat = (uuid, update) => {
  return new Promise(async (res, rej) => {
    try {
      const updatedDoc = await Hero.findOneAndUpdate({ uuid }, update, {})

      console.log(updatedDoc)
      res(true)
    } catch {
      rej(false)
    }
  })
}

// Notification
const addNotificationToDb = async (_notificationSchema, _uuid) => {
  const notification = new Notification()
  for (const [key, value] of Object.entries(_notificationSchema)) {
    notification[key] = value
  }

  console.log(notification)
  await notification.save()
  console.log('notification saved')
}

const markAsRead = (uuid) => {
  return new Promise(async (res, rej) => {
    try {
      const update = await Notification.findOneAndUpdate(
        { uuid },
        { read: true },
        {}
      )
      res()
    } catch (err) {
      console.log(err)
      rej()
    }
  })
}

const getAllUnreadNotifications = async () => {
  return new Promise(async (res, rej) => {
    const data = await Notification.find({ read: false })
    res(data)
  })
}

const getAllNotifications = async () => {
  return new Promise(async (res, rej) => {
    const data = await Notification.find({})
    res(data)
  })
}

export {
  initDB,
  initCharacterToDb,
  addDataToDb,
  getCharacterFromDb,
  entryExists,
  getAllCharactersFromDb,
  updateCharacterStat,
  addNotificationToDb,
  markAsRead,
  getAllUnreadNotifications,
  getAllNotifications,
}
