La idea de esta página es crear un proyecto Fullstack, integrando Backend y Frontend. 
La aplicación utiliza como base de datos MySQL, y está construido con sequelize.

Las tablas se generan con migraciones (se encuentran en la carpeta "migrations"); las migraciones son archivos .js con "timestamps"(AÑO/MES/DIA) al comienzo y un orden jerárquico numérico a continuación. Tal que (20251009-001-user.js) es un archivo, y (20251009-002-products-categories.js) es otro. Este archivo, al ser ejecutado, crea las tablas pendientes en el proyecto.

Para correr estas migraciones son necesarios ciertos comandos en la terminal:

Al ejecutar <npx sequelize-cli db:migrate> en la terminal, se genera automáticamente una tabla "sequelizemeta" junto a las tablas pendientes. Esta tabla guarda un registro de los cambios que se hacen a las demás tablas, permitiéndome volverlas a estados anteriores.

Ejecutando <npx sequelize-cli db:migrate:undo> se revierte la última migración ejecutada y elimina el registro en "sequelizemeta"

Por último, ejecutando <npx sequelize-cli db:migrate:undo:all> revierte todas las migraciones hechas. 
