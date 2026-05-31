import express from "express";
import routineRoutes from "./routes/route";
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/routines", routineRoutes);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get(/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export { app };