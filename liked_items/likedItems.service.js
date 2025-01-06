import knex from 'knex';
import config from './knexfile.js';

const db = knex(config);

export const addLikedItem = async (userId, itemId) => {
  return await db('liked_items').insert({
    user_id: userId,
    item_id: itemId,
  });
};

export const getLikedItems = async (userId) => {
  return await db('liked_items').where({ user_id: userId });
};

export const removeLikedItem = async (userId, itemId) => {
  return await db('liked_items')
    .where({ user_id: userId, item_id: itemId })
    .del();
};
