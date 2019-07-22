module.exports = {
  failure: (res) => (message, code = 500) => {
    return res.status(code).json({
      error: true,
      message
    })
  },
  success: (res) => (docs, { total = 0, page = 0, limit = 0 } = {}, code = 200) => {
    return res.status(code).json({
      error: false,
      data: {
        pagination: {
          total,
          limit,
          page
        },
        docs
      }
    })
  }
}
