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

    /*
    table.increments('id').primary();          // Auto-incrementing ID
    table.integer('userid').notNullable().unsigned();
    table.foreign('userid').references('id').inTable('users');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.boolean('action').notNullable().defaultTo(false); // Defaults to false
    table.boolean('available').notNullable().defaultTo(true);
    table.timestamps(true, true); // created_at and updated_at timestamps
    */
  
    /*
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
    table.increments('id').primary();          // Auto-incrementing ID
    table.string('fullname').notNullable();
    table.string('username').notNullable().unique(); // Unique username
    table.string('password').notNullable();    // Password field (will store hashed password)
    table.text('profile_pic');             // Profile picture URL
    table.timestamps(true, true);              // created_at and updated_at timestamps
    */
  });
}

export function down(knex) {
  return knex.schema.dropTable('items');       
}