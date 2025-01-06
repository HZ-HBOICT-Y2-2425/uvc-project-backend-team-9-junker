/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('liked_items', (table) => {
      table.increments('id').primary(); // Auto-increment ID
      table.string('user_id').notNullable(); // ID of the user
      table.string('item_id').notNullable(); // ID of the liked item
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of when the like was created
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTableIfExists('liked_items'); // Drop the table if rolled back
  }
  