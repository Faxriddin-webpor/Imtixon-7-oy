import express from "express";
import { router } from "./router/rooms.router.js";
import dotenv from "dotenv/config";
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

app.use(router);

app.listen(PORT, console.log("Server is running on port --> " + PORT));
