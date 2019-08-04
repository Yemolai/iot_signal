const { isPositiveIntNumber } = require('../utils/validation')

const tableName = 'iot_signal'

module.exports = (knex) => ({
  /**
   * Returns list of registered signals ordering from the most recent timestamp first
   */
  get: ({ page = 1, limit = 100 }) => {
    const _page = isPositiveIntNumber(page) ? page : 1
    const _limit = isPositiveIntNumber(limit) ? limit : 100
    const offset = (Number(_page) - 1) * Number(_limit)
    return knex(tableName).orderBy('timestamp', 'desc').limit(_limit).offset(offset)
  },
  /**
   * Returns the total number of registered signals
   */
  count: async () => {
    const results = knex(tableName).count('id')
    return results.reduce((a, c) => c['count(`id`)'], 0)
  },
  /**
   * Inserts a new signal
   */
  insert: async ({ value, timestamp }) => {
    const nowISO = new Date().toISOString()
    const newData = {
      id: null,
      value,
      timestamp,
      created_at: nowISO,
      updated_at: nowISO
    }
    const [ result ] = await knex(tableName).insert([ newData ])
    const resultData = {
      ...newData,
      id: result
    }
    return resultData
  }
})
