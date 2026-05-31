import express from "express";
import routineRoutes from "./routes/route";
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/routines", routineRoutes);

const distPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(distPath));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export { app };