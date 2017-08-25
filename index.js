'use strict'

const path = require('path')
const storage = require('node-persist')
const { encrypt, decrypt } = require('caesar-encrypt')

class SaveLocal {
  constructor(store) {
    storage.initSync({
      dir: store
    })
  }

  get(item) {
    return storage.getItem(item).then(res => {
      if (res) {
        return decrypt(res, 20)
      }

      return false
    })
  }

  set({ name, value }) {
    return storage.setItem(name, encrypt(value, 20))
  }

  remove(name) {
    return storage.removeItem(name)
  }
}

module.exports = SaveLocal
