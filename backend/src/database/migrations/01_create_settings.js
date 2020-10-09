exports.up = knex => {
    return knex.schema.createTable('settings', table => {
        table.decimal('dollar').defaultTo(0);
        table.decimal('cost').defaultTo(0);
        table.decimal('discounts').defaultTo(0);
    })
};
exports.down = knex => {
    return knex.schema.dropTable('settings')
}