import { Router } from "express";
import { GET, GET_ID, GET_FREE_TIMES, POST } from "../controller/rooms.js";
import { checkValBody, checkVal_Id } from "../middleware/middleware.js";

export const router = Router();

router.get("/api/rooms", GET);
router.get("/api/rooms/:id", checkVal_Id, GET_ID);
router.get("/api/rooms/:id/availability", checkVal_Id, GET_FREE_TIMES);
router.post("/api/rooms/:id/book", checkVal_Id, checkValBody, POST);
