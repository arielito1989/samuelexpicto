const knex = require('knex');
const path = require('path');

// This function will be called from the Electron main process
// with the appropriate userData path.
const setupDatabase = (userDataPath) => {
  const dbPath = path.join(userDataPath, 'comunicador-pictografico.sqlite3');

  const db = knex({
    client: 'better-sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    }
  });

  // We can add a function to automatically run migrations
  const initialize = async () => {
    try {
      await db.migrate.latest();

      // The database is empty, but we don't want to seed it initially.
      // await db.seed.run();
      return { success: true, message: 'Database initialized successfully.' };
    } catch (error) {
      return { success: false, message: `Error initializing database: ${error.message}` };
    }
  };

  return { db, initialize };
};

module.exports = setupDatabase;
