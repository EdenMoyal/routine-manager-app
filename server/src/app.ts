import express from "express";
import routineRoutes from "./routes/route";
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/routines", routineRoutes);

export { app };