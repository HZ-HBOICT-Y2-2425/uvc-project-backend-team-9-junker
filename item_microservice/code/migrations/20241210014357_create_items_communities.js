
export function up(knex) {
    return knex.schema.createTable('items_communities', function(table) {
      table.increments('id').primary();
      table.integer('item_id').unsigned().notNullable()
           .references('id').inTable('items')
           .onDelete('CASCADE');
      table.integer('community_id').unsigned().notNullable()
           .references('id').inTable('community')
           .onDelete('CASCADE');
      table.timestamps(true, true);
    });
  };
  
export function down(knex) {
return knex.schema.dropTable('items_communities');
};