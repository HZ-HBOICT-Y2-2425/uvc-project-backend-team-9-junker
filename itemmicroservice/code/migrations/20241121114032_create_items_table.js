export function up(knex) {
  return knex.schema.createTable('items', function(table) {
    table.increments('id').primary();          
    table
    .integer('userid') // Foreign key linking to users table
    .unsigned() // Unsigned to match `increments` type
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE'); // Deletes items if the user is deleted
    table.string('name').notNullable();    
    table.string('description'); // Optional
    table.boolean('action').defaultTo(false); // Defaults to false
    table.boolean('available').notNullable().defaultTo(true); // Defaults to true
    table.timestamps(true, true); // Adds created_at and updated_at
  });
}

export function down(knex) {
  return knex.schema.dropTable('items');       
}

  