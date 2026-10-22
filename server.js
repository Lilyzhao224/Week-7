import express from "express";
import { JSONFilePreset } from "lowdb/node";

const app = express();
const port = process.env.PORT || 3000;

// database
const defaultData = { dreams: [] };
const db = await JSONFilePreset("db.json", defaultData);

// let express read JSON
app.use(express.json());

// serve files inside public folder
app.use(express.static("public"));


// POST - receive and store new data
app.post("/new-data", async (req, res) => {

  const newDream = req.body;

  db.data.dreams.push(newDream);

  await db.write();

  res.json({
    message: "Dream archived successfully!"
  });

});


// GET - send stored data
app.get("/data", async (req, res) => {

  await db.read();

  res.json(db.data.dreams);

});


// start server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});