import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./src/routes/authRoutes.js";
import dataRoute from "./src/routes/dataRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/data", dataRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
