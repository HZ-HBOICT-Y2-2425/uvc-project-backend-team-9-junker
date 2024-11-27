export const development = {
  client: 'sqlite3',
  connection: {
    filename: './items.db',
  },
  useNullAsDefault: true, // Required for SQLite
  migrations: {
    directory: './migrations',
  },
};

export default development;
