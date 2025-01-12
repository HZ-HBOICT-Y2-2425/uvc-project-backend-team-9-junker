export function up(knex) {
  return knex.schema.createTable('trades', function (table) {
      table.increments('id').primary();
      table.integer('requester_id').unsigned().notNullable()
          .references('id').inTable('users').onDelete('CASCADE'); // User requesting the trade
      table.integer('receiver_id').unsigned().notNullable()
          .references('id').inTable('users').onDelete('CASCADE'); // User receiving the request
      table.integer('item_requested_id').unsigned().notNullable()
          .references('id').inTable('items').onDelete('CASCADE'); // Item being requested
      table.integer('item_offered_id').unsigned().nullable()
          .references('id').inTable('items').onDelete('SET NULL'); // Item offered for trade
      table.string('status').defaultTo('pending'); // pending, accepted, rejected, completed
      table.timestamps(true, true); // created_at, updated_at
  });
}

export function down(knex) {
  return knex.schema.dropTable('trades');
}