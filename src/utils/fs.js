import fs from "fs";
import path from "path";

const read = (dir) =>
  JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", dir + ".json"))
  );

const write = (dir, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(
      path.join(process.cwd(), "src", "model", dir + ".json"),
      JSON.stringify(data, null, 4),
      (error) => {
        if (error) reject(error);
        resolve(data);
      }
    );
  });
};

export { read, write };
