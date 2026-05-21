// const mongoose = require('mongoose')
// const dotenv = require('dotenv')
// const Hero = require('../mongoose_models/hero.js')
// const Notification = require('../mongoose_models/notification.js')

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Hero from '../mongoose_models/hero.js'
import Notification from '../mongoose_models/notification.js'

// dotenv.config()

// console.log(Hero)

const uri = process.env.DATABASE_URI

let connected = false

// Hero
const initCharacterToDb = async (_heroSchema, _uuid) => {
  await initDB()
  const hero = new Hero()

  for (const [key, value] of Object.entries(_heroSchema)) {
    hero[key] = value
  }

  console.log(hero)
  await hero.save()
  console.log('character saved')
}

const initDB = async () => {
  if (connected) return
  console.log('connecting to mongo')
  await mongoose.connect(uri)
  connected = true
  console.log('mongodb connected')
}

const addDataToDb = () => {}

const getCharacterFromDb = async (uuid) => {
  await initDB()
  return Hero.findOne({ uuid })
}

const entryExists = async (uuid) => {
  await initDB()
  return Hero.exists({ uuid })
}

const getAllCharactersFromDb = async () => {
  await initDB()
  return Hero.find({})
}

const updateCharacterStat = async (uuid, update) => {
  await initDB()
  try {
    await Hero.findOneAndUpdate({ uuid }, update, {})
    return true
  } catch {
    return false
  }
}

const ALL_PORTRAITS = ['1','2','3','4','5','6','7','8','9','10','11']

const assignPortrait = async (uuid) => {
  await initDB()
  const used = await Hero.distinct('portrait', { portrait: { $ne: null } })
  const available = ALL_PORTRAITS.filter((p) => !used.includes(p))
  if (available.length === 0) return null
  const portrait = available[Math.floor(Math.random() * available.length)]
  await Hero.findOneAndUpdate({ uuid }, { portrait }, {})
  return portrait
}

// Notification
const addNotificationToDb = async (_notificationSchema, _uuid) => {
  await initDB()
  const notification = new Notification()
  for (const [key, value] of Object.entries(_notificationSchema)) {
    notification[key] = value
  }
  await notification.save()
  console.log('notification saved')
}

const markAsRead = async (uuid) => {
  await initDB()
  return Notification.findOneAndUpdate({ uuid }, { read: true }, {})
}

const getAllUnreadNotifications = async () => {
  await initDB()
  return Notification.find({ read: false })
}

const getAllNotifications = async () => {
  await initDB()
  return Notification.find({})
}

export {
  initDB,
  initCharacterToDb,
  addDataToDb,
  getCharacterFromDb,
  entryExists,
  getAllCharactersFromDb,
  updateCharacterStat,
  assignPortrait,
  addNotificationToDb,
  markAsRead,
  getAllUnreadNotifications,
  getAllNotifications,
}
