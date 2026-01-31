'use client'

const _db = {}

const getEntry = (uuid) => {
  console.log(_db)
  return _db[`${uuid}`]
}

const pushEntry = (uuid, data) => {
  _db[uuid] = data
  // console.log(_db)
}

const getDb = () => {
  return _db
}

export { getEntry, pushEntry, getDb }
