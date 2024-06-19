import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import usersRouter from "./routes/users.js";
import { logger } from "./middlewares/logger.js";

const app = express();

// __filename and __dirname equivalents for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to Pug
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

// Middleware for static files
app.use("/static", express.static(path.join(__dirname, "/public")));

// Middlewares
app.use(logger);
// This mw allows express to read the requests body
app.use(express.urlencoded({ extended: true }));
/*
 * This mw parses json information from the body of a request (Maybe a client sending json to this server
 * or fetching a server from this one and getting a json response)
 */
app.use(express.json());

// Set the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Basic route
app.get("/", routeLogger, (req, res) => {
  res.render("index", { title: "My Express App", text: "world" });
});

// Sub routes
app.use("/users", usersRouter);

function routeLogger(req, res, next) {
  console.log("Route logger", req.originalUrl);
  next();
}
