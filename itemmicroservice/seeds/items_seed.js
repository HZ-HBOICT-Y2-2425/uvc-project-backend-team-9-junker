export const seed = async (knex) => {
    // Deletes ALL existing entries
    await knex('items').del();
  
    // Inserts seed entries
    await knex('items').insert([
      {
        userid: 1,
        name: 'Item 1',
        description: 'This is a description for Item 1',
        action: false,
        available: true,
      },
      {
        userid: 2,
        name: 'Item 2',
        description: 'This is a description for Item 2',
        action: true,
        available: false,
      },
      {
        userid: 3,
        name: 'Item 3',
        description: 'This is a description for Item 3',
        action: false,
        available: true,
      },
    ]);
  };
  