exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();          // Auto-incrementing ID
      table.string('username').notNullable().unique(); // Unique username
      table.string('password').notNullable();    // Password field (will store hashed password)
      table.timestamps(true, true);               // created_at and updated_at timestamps
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');       // Rollback: Drop the users table
  };
  