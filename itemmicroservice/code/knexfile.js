export const development = {
  client: 'sqlite3',
  connection: {
    filename: './sqlite3',
  },
  useNullAsDefault: true, // Required for SQLite
  migrations: {
    directory: './migrations',
  },
};

export default development;
