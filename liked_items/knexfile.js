export const development = {
  client: 'sqlite3',
  connection: {
    filename: './liked_items.db', // SQLite database file
  },
  useNullAsDefault: true, // SQLite-specific option
  migrations: {
    directory: './migrations', // Folder for migration files
  },
  seeds: {
    directory: './seeds', // Folder for seed files
  },
};

export default development;
