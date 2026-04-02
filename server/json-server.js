const path = require("path");
const cors = require("cors");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const PORT = Number(process.env.PORT || process.env.MOCK_PORT || 5001);

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
server.use(middlewares);
server.use("/api", router);

const httpServer = server.listen(PORT, () => {
  console.log(`JSON Server mock API: http://localhost:${PORT}/api`);
  console.log("  GET/POST /api/users | /api/tasks | /api/orders | /api/roles | /api/tokens");
});

httpServer.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is busy (e.g. Express on 5000 is fine; mock uses 5001). Stop what uses ${PORT} or set MOCK_PORT to a free port.`,
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
