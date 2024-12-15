export const seed = async (knex) => {
  // Deletes ALL existing entries in the communities table
  await knex('communities').del();

  // Inserts seed entries
  await knex('communities').insert([
    {
      id: 1,
      userid: 1, // Replace with a valid `userid` from the `users` table
      name: 'Middelburg',
      location: 'Middelburg',
      description: 'Middelburg public community.',
      status: 'public',
      cover_pic: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/22/9b/36/photo0jpg.jpg?w=1800&h=1000&s=1',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      userid: 1,
      name: 'HZ Students',
      location: 'Middelburg',
      description: 'A community of HZ students.',
      status: 'public',
      cover_pic: 'https://hz.nl/uploads/media/2.Algemeen/Locaties/Groene-Woud/_1200x900_crop_center-center_90_none/2185129/Groene-Woud-buitenkant-header-1.webp',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      userid: 1,
      name: 'APV Residents',
      location: 'Middelburg',
      description: 'A group of APV residents.',
      status: 'public',
      cover_pic: 'https://wijzijndestad.com/wp-content/uploads/2020/10/campus-middelburg-in-gebruik-genomen-in-voormalig-hoofdkantoor-delta_021-1920x1440.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      userid: 1,
      name: 'APV Residents',
      location: 'Vlissingen',
      description: 'A group of APV residents.',
      status: 'public',
      cover_pic: 'https://i.regiogroei.cloud/41feb915-e8c8-34b5-b01b-57b76c5bc1b5.jpg?width=1104&height=620&aspect_ratio=1104:620&cb=3ff981ed2761317b2792bd6fcc5b213b',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
