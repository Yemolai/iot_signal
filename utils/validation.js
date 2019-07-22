const isPositiveIntNumber = (num) => {
  return num && Math.floor(Number(num)) === num && Number(num) > 0
}

const isNumber = (num) => {
  return num && Number(num) === num
}

module.exports = {
  isPositiveIntNumber,
  isNumber
}
