const express = require("express");
const app = express();
const port = 3001;

const colorService = require('./db/color.service')

app.get("/colors", async(req, res) => {
  const colors = await colorService.query()
  res.json(colors);
});

app.post("/colors/:color", async(req, res) => {
  const color = req.params.color
  const newColor = await colorService.add(color)
  res.json(newColor);
})

app.put("/colors/:id", async(req, res) => {
  const id = req.params.id
  const color = await colorService.getById(id)
  color.votes++
  await colorService.update(color)
  res.send("done");
});

app.delete("/colors/:id", async(req, res) => {
  const id = req.params.id
  await colorService.remove(id)
  res.send("done");
})

app.listen(port, () => {
  console.log(`Color app listening on port ${port}`);
});