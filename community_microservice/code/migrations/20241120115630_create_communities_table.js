export function up(knex) {
    return knex.schema.createTable('communities', function(table) {
        table.increments('id').primary();
        table
            .integer('userid')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('location');
        table.string('description');
        table.string('status');
        table.text('cover_pic');
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTableIfExists('communities');
}
