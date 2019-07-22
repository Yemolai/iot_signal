const express = require('express')
const { Signal } = require('../database')
const { failure, success } = require('../utils/response')
const { isPositiveIntNumber, isNumber } = require('../utils/validation')

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, _next) => {
  try {
    const { $limit = 100, $page = 1 } = req.query
    const limit = isPositiveIntNumber($limit) ? Number($limit) : 100
    const page = isPositiveIntNumber($page) ? Number($page) : 1
    const total = await Signal.count()
    console.log(JSON.stringify({ total }))
    const docs = await Signal.get({ page, limit })
    success(res)(docs, { total, page, limit })
  } catch ({ message }) {
    failure(res)(message, 500)
  }
})

router.post('/', async (req, res, _next) => {
  try {
    const { value, timestamp: rawTimestamp } = req.body
    if (!isNumber(value)) {
      throw new Error('value must be a number')
    }
    if (!isNumber(rawTimestamp)) {
      throw new Error('timestamp must be a number')
    }
    const timestamp = new Date(rawTimestamp).toISOString()
    const inserted = await Signal.insert({ value, timestamp })
    console.log(JSON.stringify(inserted))
    success(res)(inserted, { page: 1, total: 1, limit: 1 }, 201)
  } catch ({ message }) {
    failure(res)(message, 400)
  }
})

module.exports = router
