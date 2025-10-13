require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const app = express();

app.use(express.static("public"));
app.use(express.json());

// CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: CORS_ORIGIN,
}));

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingrese a http://localhost:${APP_PORT}.\n`);
  console.log(`[Express] CORS habilitado para ${CORS_ORIGIN}`);
});
