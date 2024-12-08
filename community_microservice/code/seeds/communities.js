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
      cover_pic: 'https://en.wikipedia.org/wiki/Middelburg_Town_Hall#/media/File:Townhall_of_Middelburg_at_4_May_2012_in_the_morning_-_panoramio.jpg',
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
      cover_pic: 'https://www.apvhousing.com/themes/saas-apv-housing/public/images/logo.svg',
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
      cover_pic: 'https://www.apvhousing.com/themes/saas-apv-housing/public/images/logo.svg',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
