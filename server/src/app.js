import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';





import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use( (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
})

app.use(
  cors({
    origin: "https://to-do-app-pwpc.onrender.com",
    credentials: true,
  })
);

app.get("/api", (req,res)=>{
    res.send("Hello from server!!")
})

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 1. Serve the static files from the Vite build "dist" folder
app.use(express.static(path.join(__dirname, '../../client/dist')));



// 3. The "Catch-All" route
// If the user hits a route that isn't an API, send them the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});



app.use((err, req, res, next) => {
  console.error("EXPRESS GLOBAL ERROR HANDLER:", err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});


export default app;
