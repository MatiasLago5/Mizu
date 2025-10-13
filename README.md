La idea de este proyecto es crear una página Fullstack, integrando Backend y Frontend. 
La aplicación utiliza como base de datos MySQL, y está construido con sequelize.

Las tablas se generan con migraciones (se encuentran en la carpeta "migrations"); <strong>las migraciones son archivos .js con "timestamps"(AÑO/MES/DIA) al comienzo y un orden jerárquico numérico a continuación. Tal que (20251009-001-user.js) es un archivo, y (20251009-002-products-categories.js) es otro. Este archivo, al ser ejecutado, crea las tablas pendientes en el proyecto<strong>.

Para correr estas migraciones son necesarios ciertos comandos en la terminal:

Al ejecutar <strong>"npx sequelize-cli db:migrate"</strong> en la terminal, se genera automáticamente una tabla "sequelizemeta" junto a las tablas pendientes. Esta tabla guarda un registro de los cambios que se hacen a las demás tablas, permitiéndome volverlas a estados anteriores.

Ejecutando <strong>"npx sequelize-cli db:migrate:undo"</strong> se revierte la última migración ejecutada y elimina el registro en "sequelizemeta"

Por último, ejecutando <strong>"npx sequelize-cli db:migrate:undo:all"</strong> revierte todas las migraciones hechas. 

The goal of this project is to create a Fullstack web application, integrating both Backend and Frontend.
The app uses MySQL as its database and is built with Sequelize.

Database tables are generated through migrations (located in the /migrations folder).

Each migration is a .js file with a timestamp and numeric order, e.g.

20251009-001-user.js or 20251009-002-products-categories.js.

When executed, these files create the pending tables in the project.

Running Migrations

npx sequelize-cli db:migrate runs all pending migrations and creates SequelizeMeta table that tracks executed migrations. 

npx sequelize-cli db:migrate:undo reverts the last executed migration and removes its record from SequelizeMeta.

npx sequelize-cli db:migrate:undo:all reverts all executed migrations.