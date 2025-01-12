import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

export async function runMigrations() {
    try {
        console.log('Rolling back database migrations...');
        const [batchNo, logRollback] = await db.migrate.rollback(null, true); // Roll back all migrations
        console.log(`Rolled back to batch ${batchNo}: ${logRollback.length} migrations`);
        logRollback.forEach((file) => console.log(`Rolled back migration file: ${file}`));

        console.log('Running database migrations...');
        const [newBatchNo, logMigrate] = await db.migrate.latest(); // Apply all migrations
        console.log(`Batch ${newBatchNo} run: ${logMigrate.length} migrations`);
        logMigrate.forEach((file) => console.log(`Migration file executed: ${file}`));
    } catch (error) {
        console.error('Error running migrations:', error);
    } finally {
        await db.destroy(); // Always destroy the db connection at the end
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

export async function getUsers() {
    try {
      // Query all users
        const users = await db('users').select('*');
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}

export async function deleteUser(id) {
    try {
        // Delete the user with the specified ID
        await db('users').where('id', id).del();
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        // Destroy the Knex connection after the query
        db.destroy();
    }
}

export async function getCO2Categories() {
    try {
        const categories = await db('co2categories').select('*');
        console.log(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}