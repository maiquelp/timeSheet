import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('settings', table => {
        table.decimal('dollar').defaultTo(0);
        table.decimal('cost').defaultTo(0);
        table.decimal('discounts').defaultTo(0);
    })
};
export async function down(knex: Knex) {
    return knex.schema.dropTable('settings')
}