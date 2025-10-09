/*
 * Este archivo se encarga de importar todos los seeders que se hayan definido
 * en el sistema y ejectuarlos.
 *
 * Para ejecutar este archivo se debe correr el comando:
 *
 * 👉 node seeders/runAllSeeders.js
 *
 *
 * Como alternativa, en el artchivo package.json se creó un comando "alias"
 * para que la ejecución sea un poco más corta:
 *
 * 👉 npm run seeders
 */

require("dotenv").config();

async function runAllSeeders() {
  await require("./userSeeder")();
  await require("./productSeeder")();

  /*
  * Aquí se pueden ejectuar otros seeders que hayan en el sistema.
  * IMPORTANTE: mantener el orden cuando existan dependencias entre datos.
   */

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();
