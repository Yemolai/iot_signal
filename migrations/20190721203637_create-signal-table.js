const tableName = 'iot_signal'
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.float('value')
    table.timestamp('timestamp')
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(tableName)
}
