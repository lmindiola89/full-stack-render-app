import express from "express";
// cors permite que el cliente se conecte con el servidor
import cors from "cors";
// pg permite conectar la base de datos con el servidor
import pg from "pg";
import {
  DB_HOSTNAME,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  FRONTEND_URL,
  PORT,
} from "./config.js";

const app = express();

const pool = new pg.Pool({
  host: DB_HOSTNAME,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});

app.use(
  cors({
    // lo especifico a cors que ruta de cliente debe conectar al servidor
    origin: FRONTEND_URL,
  })
);

app.get("/ping", async (req, res) => {
  const result = await pool.query("SElECT NOW()");
  // console.log(result);

  res.send({
    pong: result.rows[0].now,
  });
});

app.listen(PORT, () => {
  console.log("server listening on");
});
