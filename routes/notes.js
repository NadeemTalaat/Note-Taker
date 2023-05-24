const express = require("express");
const notes = express.Router();

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request received to submit notes`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/notes.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

notes.delete("/:id", async (req, res) => {
  console.info(`${req.method} request received for notes`);

  const data = await readFromFile("./db/notes.json").then((data) =>
    JSON.parse(data)
  );

  const id = req.params.id;

  const newData = data.filter((item) => item.id !== id);

  writeToFile("./db/notes.json", newData);

  res.status(200).json();
});

module.exports = notes;
