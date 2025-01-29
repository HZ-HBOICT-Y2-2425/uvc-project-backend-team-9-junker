export function up(knex) {
    return knex.schema.createTable('co2categories', function(table) {
        table.increments('id').primary();
        table.string('category').notNullable();
        table.float('co2_reduction_kg').notNullable();
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTableIfExists('co2categories');
}
