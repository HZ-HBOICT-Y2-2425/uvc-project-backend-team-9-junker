/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').del();

  // Inserts seed entries
  await knex('items').insert([
    {
      userid: 1, // Replace with valid user ID
      name: 'Sample Item 1',
      description: 'Description for Sample Item 1',
      action: true,
      available: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      userid: 1, // Replace with valid user ID
      name: 'Sample Item 2',
      description: 'Description for Sample Item 2',
      action: false,
      available: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      userid: 1, // Replace with valid user ID
      name: 'Sample Item 3',
      description: null, // Optional description
      action: false,
      available: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
