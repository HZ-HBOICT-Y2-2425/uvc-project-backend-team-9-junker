export const development = {
  client: 'sqlite3',
  connection: {
    filename: './items.db',
  },
  useNullAsDefault: true, // Required for SQLite
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds' // Path to your seed files
  },
};

export default development;
