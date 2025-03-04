enum TCache {
  Local,
  Session
}

class Cache {
  private storage: Storage
  constructor(type: TCache) {
    this.storage = type === TCache.Local ? localStorage : sessionStorage
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (err) {
        return value
      }
    }
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(TCache.Local)
const sessionCache = new Cache(TCache.Session)

export { localCache, sessionCache }
