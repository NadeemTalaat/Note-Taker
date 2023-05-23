const express = require("express");
const app = express();

const PORT = 3001;

const notesRouter = require("./notes");

app.use("/notes", notesRouter);

module.exports = app;
