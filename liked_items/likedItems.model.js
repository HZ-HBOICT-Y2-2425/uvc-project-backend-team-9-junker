import knex from '../database/knex.js'; // Replace with your database connection

// Save liked item to the database
export const saveLikedItemModel = async (userId, itemId, itemDetails) => {
  return knex('liked_items').insert({
    user_id: userId,
    item_id: itemId,
    item_details: JSON.stringify(itemDetails)
  });
};

// Fetch liked items for a user
export const getLikedItemsModel = async (userId) => {
  return knex('liked_items').where({ user_id: userId });
};
