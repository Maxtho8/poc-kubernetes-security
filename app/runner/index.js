import express from "express";
import { exec } from "child_process";
import * as fs from "fs";
const app = express();
app.use(express.json());
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.post("/execute", (req, res) => {
  const code = req.body.code;
  const fileID = generateRandomFileID();
  fs.writeFileSync(fileID + ".js", code);
  exec("node " + fileID + ".js", (error, stdout, stderr) => {
    if (stderr) {
      res.send({ error: stderr });
    } else {
      res.send({ output: stdout });
    }
    fs.unlinkSync(fileID + ".js");
  });
});

app.listen(8081, () => {
  console.log("Runner running on port 8081");
});

function generateRandomFileID() {
  const now = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000);
  return `file_${now}_${random}`;
}
