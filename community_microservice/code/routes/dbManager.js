import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

export async function getCommunities() {
    try {
      // Query all users
        const communities = await db('communities').select('*');
        console.log(communities);
    } catch (error) {
        console.error('Error fetching uscommunitiesers:', error);
    }
}

export async function deleteCommunityById(id) {
    try {
        // Delete the user with the specified ID
        await db('communities').where('id', id).del();
        console.log('Community deleted successfully');
    } catch (error) {
        console.error('Error deleting:', error);
    }
}

export async function getCommunityMembers() {
    try {
      // Query all users
        const members = await db('members').select('*');
        console.log(members);
    } catch (error) {
        console.error('Error fetching communityUsers:', error);
    }
}

export async function runSeeds() {
    try {
        console.log('Running database seeds...');
        await db.seed.run();
        console.log('Database seeding completed.');
    } catch (error) {
        console.error('Error running seeds:', error);
    } finally {
        await db.destroy();
    }
}
