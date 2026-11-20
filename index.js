import express from "express";
import pesananRoutes from "./routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", pesananRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});