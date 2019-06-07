// Packages
const { join } = require('path')
const { homedir } = require('os')
const storage = require('node-persist')
const { encrypt, decrypt } = require('caesar-encrypt')

class SaveLocal {
  constructor(store = 'storage') {
    const s = `.${store}`

    storage.init({
      dir: join(homedir(), s)
    })
  }

  async get(item) {
    const hasItem = await storage.getItem(item)

    return hasItem && hasItem
  }

  set(item) {
    const value = encrypt(item.value, 20)

    return storage.setItem(item.name, value)
  }

  remove(name) {
    return storage.removeItem(name)
  }

  async list() {
    const list = []
    await storage.forEach(item => {
      const value = decrypt(item.value, 20)
      return list.push({ name: item.key, value })
    })

    return list
  }
}

module.exports = SaveLocal
