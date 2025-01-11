export function up(knex) {
  return knex.schema.createTable('items', function(table) {
    
    table.increments('id').primary(); // Auto-incrementing ID
    table.integer('userid').notNullable().unsigned();
    table.foreign('userid').references('id').inTable('users');
    table.string('name', 255).notNullable(); // Name of the item
    table.text('description').defaultTo(""); // Description of the item
    table.string('pictures'); // JSON array for pictures
    table.boolean('action', 100).defaultTo(true);; // Action associated with the item
    table.boolean('available').defaultTo(true); // Availability status
    table.integer('views').defaultTo(0); // Number of views
    table.integer('interested').defaultTo(0); // Number of interested users
    table.timestamps(true, true); // created_at and updated_at timestamps
    table.string('categories'); // JSON array for categories
    table.string('communities'); // JSON array for communities
  });
}

export function down(knex) {
  return knex.schema.dropTable('items');       
}