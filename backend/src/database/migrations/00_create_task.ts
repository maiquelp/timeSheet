import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('task', table => {
        table.increments('id').primary();
        table.decimal('time').notNullable();
        table.decimal('exp_time');
        table.timestamp('submit').defaultTo(knex.fn.now());
    })
};
export async function down(knex: Knex) {
    return knex.schema.dropTable('task')
}