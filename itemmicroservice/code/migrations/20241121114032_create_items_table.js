export function up(knex) {
  return knex.schema.createTable('items', function(table) {
    table.increments('id').primary();          
    table.string('userid').notNullable().unique(); 
    table.foreign('userid').references('id').inTable('users').onDelete('CASCADE');
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

  