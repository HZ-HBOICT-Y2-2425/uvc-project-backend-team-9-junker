export const development = {
  client: 'sqlite3',
  connection: {
    filename: './users.db',
  },
  useNullAsDefault: true, // Required for SQLite
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

export default development;
