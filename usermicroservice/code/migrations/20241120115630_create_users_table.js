export function up(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('fullname').notNullable();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.text('profile_pic');
      table.float('co2_reduction_kg').defaultTo(0);
      table.timestamps(true, true);
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('users');       // Rollback: Drop the users table
  }
  