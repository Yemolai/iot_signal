const isPositiveIntNumber = (num) => {
  return isIntNumber(num) && Number(num) > 0
}

const validatePositiveIntNumber = (num, name) => {
  if (isPositiveIntNumber(num)) {
    return num
  }
  throw new Error(name + ' should be a positive int number')
}

const isIntNumber = (num) => {
  return !isNaN(Number(num)) && Number(num) === Number(num)
}

const validateNumber = (num, name) => {
  if (isIntNumber(num)) {
    return num
  }
  throw new Error(name + ' should be a number')
}

module.exports = {
  validatePositiveIntNumber,
  isPositiveIntNumber,
  validateNumber,
  isIntNumber
}
