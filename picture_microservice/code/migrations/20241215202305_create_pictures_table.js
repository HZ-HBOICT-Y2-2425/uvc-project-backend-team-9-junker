export function up(knex) {
    return knex.schema.createTable('pictures', function(table) {
      
      table.increments('id').primary(); // Auto-incrementing ID
      table.integer('userid').unsigned();
      table.foreign('userid').references('id').inTable('users');
      table.integer('itemid').unsigned();
      table.foreign('itemid').references('id').inTable('items');
      table.integer('communityid').unsigned();
      table.foreign('communityid').references('id').inTable('communities');
      table.string('name', 255).notNullable(); // filename of the picture
      table.text('data'); // picture data
      table.timestamps(true, true); // created_at and updated_at timestamps
  
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
    return knex.schema.dropTable('pictures');       
}