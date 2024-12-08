export function up(knex) {
    return knex.schema.createTable('members', function(table) {
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table
            .integer('community_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('communities')
            .onDelete('CASCADE');
        table.string('role').notNullable();
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTableIfExists('members');
}
