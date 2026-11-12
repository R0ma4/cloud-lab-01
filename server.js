const express = require("express");
const { time } = require("node:console");
const os = require("node:os");
 
const app = express();
app.use(express.json());
 
timer = process.uptime();

const port = Number(process.env.PORT) || 3000;
const parsedPort = Number(port);
const PORT = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;




let services = [
  { id: 1, name: "Хранение файлов", category: "storage" },
  { id: 2, name: "Виртуальная машина", category: "compute" },
  { id: 3, name: "Среда разработки", category: "development" }
];
 
app.get("/", (req, res) => {
  res.send(`
    <html lang="ru"><meta charset="utf-8">
    <title>Cloud Lab</title>
    <h1>Моё приложение в GitHub Codespaces</h1>
    <p>Приложение запущено на удалённом сервере.</p>
    <a href="/api/status">Состояние сервера</a><br>
    <a href="/api/services">Список сервисов</a>
  `);
});
 
app.get("/api/status", (req, res) => {
  res.json({
    app: process.env.APP_NAME || "Cloud Lab",
    status: "ok",
    time: new Date().toISOString(),
    hostname: os.hostname()
  });
});
 

app.get("/api/health", (req, res) => {
  res.json({
    app: process.env.APP_NAME || "Cloud Lab",
    status: "ok",
    time: time,
    hostname: os.hostname()
  });
});
 
app.get("/api/services", (req, res) => {
  const { category } = req.query;
  if (!category) { return res.json(services); }
  const filtered = services.filter((s) => s.category === category);
  res.json(filtered);
});



app.get("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = services.find(s => s.id === id);
  if (!item) {
    return res.status(404).json({ error: "Данной страницы не сущесвует" });
  }
  res.json(item);
});


app.get("/api/services", (req, res) => {
  res.json(services);
});



app.use((req, res) => {  res.status(404).json({ error: "Not Found", path: req.originalUrl });});


app.listen(port, "0.0.0.0", () => {
    try{
        console.log(`starting server`);
        console.log(`Server: http://localhost:${port}`);
    }
    catch (ex)
    {
        console.log(`Error: ${ex}`);
    }
});


