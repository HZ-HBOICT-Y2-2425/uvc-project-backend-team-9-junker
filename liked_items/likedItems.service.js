import knex from 'knex';
import config from './knexfile.js';

const db = knex(config);

export const addLikedItem = async (userId, itemId) => {
  return await db('liked_items').insert({
    user_id: userId,
    item_id: itemId,
  });
};

export const getAllLikedItems = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM liked_items', (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};


export const removeLikedItem = async (userId, itemId) => {
  return await db('liked_items')
    .where({ user_id: userId, item_id: itemId })
    .del();
};
