exports.up = knex => {
    return knex.schema.createTable('settings', table => {
        table.decimal('dolar');
        table.decimal('cost');
    })
};
exports.down = knex => {
    return knex.schema.dropTable('settings')
}