module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './db.sqlite3',
      },
      useNullAsDefault: true, // Required for SQLite
      migrations: {
        directory: './migrations',
      },
    },
  };
  