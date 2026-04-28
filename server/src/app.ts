import express from "express";
import routineRoutes from "./routes/route";

const app = express();

app.use(express.json());

app.use("/api/routines", routineRoutes);

export { app };