// Use 'npx knex seed:run' to populate database with seed data.

export const seed = async function (knex) {
    // Deletes ALL existing entries in the pictures table
    await knex('pictures').del();
    //await knex('communities').del();
  
    // Inserts seed entries
    await knex('pictures').insert([
       {
            id: 0,
            userid: 0,
            itemid: null,
            communityid: null,
            name: "default.jpg",
            data: "",
        },
    ]);
  };
  