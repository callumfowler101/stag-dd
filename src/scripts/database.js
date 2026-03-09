const mongoose = require('mongoose')
const Hero = require('../mongoose_models/hero.js')

// console.log(Hero)

const uri = process.env.DATABASE_URI

const initCharacterToDb = async (_heroSchema, _uuid) => {
  const hero = new Hero()

  for (const [key, value] of Object.entries(_heroSchema)) {
    console.log(`${key}: ${value}`)
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
  s
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

export {
  initDB,
  initCharacterToDb,
  addDataToDb,
  getCharacterFromDb,
  entryExists,
  getAllCharactersFromDb,
  updateCharacterStat,
}
