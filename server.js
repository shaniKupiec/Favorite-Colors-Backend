const express = require("express");
const app = express();
const port = 3001;

let data = [
  {
    color: "red",
    votes: 20,
  },
  {
    color: "green",
    votes: 100,
  },
  {
    color: "blue",
    votes: 5,
  },
];

const colorService = require('./db/color.service')

app.get("/colors", async(req, res) => {
  const colors = await colorService.query()
  res.json(colors);
});

app.put("/colors/:id", async(req, res) => {
  const id = req.params.id
  const color = await colorService.getById(id)
  color.votes++
  await colorService.update(color)
  res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});