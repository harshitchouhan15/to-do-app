import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req,res)=>{
    res.send("Hello from server!!")
})

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);



app.use((err, req, res, next) => {
  console.error("EXPRESS GLOBAL ERROR HANDLER:", err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});


export default app;
