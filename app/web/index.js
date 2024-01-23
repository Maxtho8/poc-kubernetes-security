import express from "express";
const app = express();
app.use(express.json());
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const RUNNER_URL = "http://localhost:8081";

app.post("/execute", async (req, res) => {
  if (!req.body?.code) {
    console.log(req.body);
    res.send({ error: "No code provided" });
    return;
  }
  try {
    const fetchRes = await fetch(RUNNER_URL + "/execute", {
      signal: AbortSignal.timeout(10000),
      method: "POST",
      body: JSON.stringify({ code: req.body.code }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await fetchRes.json();
    res.send(json);
  } catch (e) {
    res.send({ error: "Runner not responding" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8080, () => {
  console.log("Web app is running on port 8080");
});
