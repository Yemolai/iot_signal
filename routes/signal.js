const express = require('express')
const { Signal } = require('../database')
const { failure, success } = require('../utils/response')
const { isPositiveIntNumber, isIntNumber } = require('../utils/validation')

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, _next) => {
  try {
    const { $limit = 100, $page = 1 } = req.query
    const limit = isPositiveIntNumber($limit) ? Number($limit) : 100
    const page = isPositiveIntNumber($page) ? Number($page) : 1
    const total = await Signal.count()
    const docs = await Signal.get({ page, limit })
    success(res)(docs, { total, page, limit })
  } catch ({ message }) {
    failure(res)(message, 500)
  }
})

router.post('/', async (req, res, _next) => {
  try {
    const { value, timestamp: rawTimestamp } = req.body
    if (!isIntNumber(value)) {
      throw new Error('value must be a number')
    }
    if (!isPositiveIntNumber(rawTimestamp)) {
      throw new Error('timestamp must be a number')
    }
    const timestamp = new Date(rawTimestamp).toISOString()
    const inserted = await Signal.insert({ value, timestamp })
    success(res)(inserted, { page: 1, total: 1, limit: 1 }, 201)
  } catch ({ message }) {
    failure(res)(message, 400)
  }
})

module.exports = router
