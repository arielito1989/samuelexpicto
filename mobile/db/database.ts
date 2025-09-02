import * as SQLite from 'expo-sqlite';

// Definición del tipo para un pictograma
export interface Pictogram {
  id: number;
  name: string;
  imageUrl: string;
}

// Datos de ejemplo para la siembra inicial
const SEED_PICTOGRAMS: Omit<Pictogram, 'id'>[] = [
  { name: 'Agua', imageUrl: 'https://via.placeholder.com/80/007bff/ffffff?text=Agua' },
  { name: 'Comida', imageUrl: 'https://via.placeholder.com/80/28a745/ffffff?text=Comida' },
  { name: 'Jugar', imageUrl: 'https://via.placeholder.com/80/ffc107/000000?text=Jugar' },
  { name: 'Baño', imageUrl: 'https://via.placeholder.com/80/dc3545/ffffff?text=Ba%C3%B1o' },
  { name: 'Casa', imageUrl: 'https://via.placeholder.com/80/6c757d/ffffff?text=Casa' },
  { name: 'Ayuda', imageUrl: 'https://via.placeholder.com/80/17a2b8/ffffff?text=Ayuda' },
];

// Función de migración y siembra
export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.withTransactionAsync(async () => {
      console.log("Creando y sembrando base de datos inicial...");
      // Crear tablas
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS pictograms (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, imageUrl TEXT NOT NULL);`
      );
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS phrases (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, fullSentence TEXT NOT NULL, imageUrl TEXT NOT NULL, audioUrl TEXT);`
      );
      // Sembrar datos
      for (const picto of SEED_PICTOGRAMS) {
        await db.runAsync('INSERT INTO pictograms (name, imageUrl) VALUES (?, ?)', picto.name, picto.imageUrl);
      }
      console.log("Base de datos sembrada con éxito.");
    });
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   // Ejemplo de cómo manejar futuras migraciones
  //   await db.execAsync('ALTER TABLE ...');
  //   currentDbVersion = 2;
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
