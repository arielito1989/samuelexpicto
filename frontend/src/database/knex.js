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
      console.log('Database migrations completed successfully.');

      // Check if the database is empty before seeding
      const pictograms = await db('pictograms').select('id').limit(1);
      if (pictograms.length === 0) {
        console.log('Database is empty, running seeds...');
        await db.seed.run();
        console.log('Database seeding completed successfully.');
      }

    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  return { db, initialize };
};

module.exports = setupDatabase;
