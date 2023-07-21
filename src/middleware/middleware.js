import { read } from "../utils/fs.js";

export const checkVal_Id = (req, res, next) => {
  try {
    let { id } = req.params;
    const rooms = read("rooms");
    const myFilter = rooms.find((r) => r.id == id);
    if (!myFilter) {
      return res.status(404).json({
        error: "Topilmadi !",
      });
    }
    return next();
  } catch (error) {
    console.log("Error middlewaredagi checkval_Id funksiyasida !");
  }
};
export const checkValBody = (req, res, next) => {
  try {
    const { id } = req.params;
    const { resident, start, end } = req.body;
    const client = read("clients");
    const free_time = read("free_times");
    const clients = client.find((c) => c.start == start && c.end == end);
    const free_times = free_time.find(
      (f) => f.room_id == id && f.start == start && f.end == end
    );
    if (!resident || !start || !end) {
      return res.status(400).json({ error: "Ma'lumotlar to'liq emas !" });
    }
    if (client.find((c) => c.resident.name == resident.name)) {
      return res.status(400).json({
        error: "Bu user allaqachon bor !",
      });
    }
    if (clients || !free_times) {
      return res.status(410).json({
        error: "Uzr, siz tanlagan vaqtda xona band !",
      });
    }

    return next();
  } catch (error) {
    console.log("Error middlewaredagi checkVal_Body funksiyasida !");
  }
};
