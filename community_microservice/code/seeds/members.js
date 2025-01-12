export const seed = async (knex) => {
  // Deletes ALL existing entries in the communities table
  await knex('members').del();

  // Inserts seed entries
  await knex('members').insert([
    {
      user_id: 1,
      community_id: 1,
      role: 'Administrator',    
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 1,
      community_id: 2,
      role: 'Administrator',    
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 1,
      community_id: 3,
      role: 'Administrator',    
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 1,
      community_id: 4,
      role: 'Administrator',    
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
