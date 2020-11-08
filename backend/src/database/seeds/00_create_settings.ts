import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('settings').insert([
        { dollar: 0, cost: 0, discounts: 0 },
    ])
}