exports.up = knex => {
    return knex.schema.createTable('task', table => {
        table.increments('id').primary();
        table.decimal('time').notNullable();
        table.decimal('exp_time');
        table.timestamp('submit').defaultTo(knex.fn.now());
    })
};
exports.down = knex => {
    return knex.schema.dropTable('task')
}