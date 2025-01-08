import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Knex configuration
export const development = {
  client: 'sqlite3',
  connection: {
    filename: './items.db',
  },
  useNullAsDefault: true, // Required for SQLite
  migrations: {
    directory: path.resolve(__dirname, './migrations'), // Path to migrations directory
  },
  seeds: {
    directory: path.resolve(__dirname, '../seeds'), // Path to seeds directory
  },
  seeds: {
    directory: './seeds' // Path to your seed files
  },
};

export default development;
