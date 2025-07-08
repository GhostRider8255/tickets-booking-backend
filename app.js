const express = require("express");
const cors = require("cors");
const ticketRouter = require("./router/ticketRouter");
const userRouter = require("./router/userRouter");
const globalErrorHandler = require("./controller/errorController");
const customError = require("./utils/customError");

const app = express();

app.use(express.json());

const corsOptions = {
  origin:
    process.env.NODE_ENV == "production"
      ? "https://paytm-ticket-booking.vercel.app"
      : "http://127.0.0.1:5500",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
};
app.use(cors({ origin: '*' }));

// app.use("/", (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     message: "you are on the tocket booking application",
//   });
// });

app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/user", userRouter);

app.get("/cronjob", (req, res) => {
  res.status(200).json({ status: "success", message: "server is successfully running" });
});

app.all("*", (req, res, next) => {
  const err = new customError(
    `can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
