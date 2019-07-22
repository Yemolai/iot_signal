const { isPositiveIntNumber } = require('../utils/validation')

const tableName = 'iot_signal'

module.exports = (knex) => ({
  get: ({ page = 1, limit = 100 }) => {
    const _page = isPositiveIntNumber(page) ? page : 1
    const _limit = isPositiveIntNumber(limit) ? limit : 100
    const offset = (Number(_page) - 1) * Number(_limit)
    return knex(tableName).limit(_limit).offset(offset)
  },
  count: async () => {
    const results = knex(tableName).count('id')
    return results.reduce((a, c) => c['count(`id`)'], 0)
  },
  insert: async ({ value, timestamp }) => {
    const nowISO = new Date().toISOString()
    const newData = {
      id: null,
      value,
      timestamp,
      created_at: nowISO,
      updated_at: nowISO
    }
    console.log(JSON.stringify({ newData }))
    const [ result ] = await knex(tableName).insert([ newData ])
    const resultData = {
      ...newData,
      id: result
    }
    return resultData
  }
})
