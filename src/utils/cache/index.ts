/**
 *  判断是否为对象字面量
 * @param value 要判断的值
 * @returns {boolean} 是否为对象字面量
 */
function isObjectLiteral(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]' && value !== null && !Array.isArray(value)
}

enum EStorage {
  Local,
  Session
}

/** 封装Storage */
class Cache {
  storage: Storage
  constructor(type: EStorage) {
    this.storage = type === EStorage.Local ? localStorage : sessionStorage
  }

  /** 获取值 */
  getItem(key: string) {
    const res = this.storage.getItem(key)
    return res ? JSON.parse(res) : ''
  }

  /** 设置值 */
  setItem(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value || ''))
  }

  /** 删除值 */
  removeItem(key: string) {
    this.storage.removeItem(key)
  }

  /** 清空所有值 */
  clear() {
    this.storage.clear()
  }

  /** 获取key值 */
  key(index: number) {
    return this.storage.key(index)
  }

  /** 追加值 */
  addItem(key: string, value: any) {
    let res = this.getItem(key)
    if (!res) {
      // 不存在key
      this.storage.setItem(key, JSON.stringify(value || ''))
    } else {
      // 存在key
      if (Array.isArray(res)) {
        res = Array.isArray(value) ? [...res, ...value] : [...res, value]
      } else if (isObjectLiteral(res)) {
        res = { ...res, ...value }
      } else {
        res += value + ''
      }
      this.storage.setItem(key, JSON.stringify(res))
    }
  }
}

export const localCache = new Cache(EStorage.Local)
export const sessionCache = new Cache(EStorage.Session)

// 测试
// localCache.setItem('age', 27)
// localCache.setItem('name', 'zhangsan')
// localCache.setItem('user', { name: 'zhangsan', age: 18 })
// localCache.setItem('count', ['one', 'two', 'three', 'four'])
// console.log(localCache.getItem('age'))
// console.log(localCache.getItem('name'))
// console.log(localCache.getItem('user'))
// console.log(localCache.getItem('count'))

// 添加值
// localCache.addItem('info', {})
// localCache.addItem('user', { city: 'beijing' })
// localCache.addItem('count', ['eight'])
// localCache.addItem('count', 'seven')
// localCache.addItem('age', 10) // '2710'
