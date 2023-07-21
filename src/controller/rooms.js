import { read, write } from "../utils/fs.js";

//GET rooms and search room by query
export const GET = (req, res) => {
  try {
    let { name, type } = req.query;
    const rooms = read("rooms");
    if (!Object.keys(req.query).length) {
      return res.status(200).json({ count: rooms.length, results: rooms });
    }
    if (name || type) {
      const newFilter = rooms.filter((r) => r.name == name || r.type == type);
      if (!newFilter.length) {
        return res.status(404).json({
          error: "Topilmadi !",
        });
      }

      return res
        .status(200)
        .json({ count: newFilter.length, results: newFilter });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//GET search room by Id
export const GET_ID = async (req, res) => {
  try {
    let { id } = req.params;
    const rooms = read("rooms");
    const newRoom = rooms.find((r) => r.id == +id);

    return res.status(200).json({
      results: newRoom,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//GET free times of room
export const GET_FREE_TIMES = (req, res) => {
  try {
    let { id } = req.params;
    const rooms = read("rooms");
    const free_times = read("free_times");
    const myFilter = rooms.find((r) => r.id == id);

    myFilter.array = [];
    for (const i of free_times) {
      if (i.room_id == myFilter.id && delete i.room_id) {
        myFilter.array.push(i);
      }
    }
    return res.status(200).json({ results: myFilter.array });
  } catch (error) {
    console.log(error.message);
  }
};

//POST
export const POST = (req, res) => {
  try {
    let { id } = req.params;
    const rooms = read("rooms");
    const clients = read("clients");
    const newFilter = rooms.find((r) => r.id == id);
    const { resident, start, end } = req.body;

    clients.push({
      id: clients.at(-1)?.id + 1 || 1,
      resident,
      start,
      end,
      room_id: newFilter.id,
    });

    write("clients", clients);
    return res.status(201).json({
      message: "Xona muvaffaqiyatli band qilindi",
    });
  } catch (error) {
    console.log(error.message);
  }
};
