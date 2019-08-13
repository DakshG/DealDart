const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//For chat
const http = require("http");
const SocketIo = require("socket.io");

//Passport JS Authentication
const passport = require("./config/passport/passport");

//Enable CORS
app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require("./routes/index");
const searchRouter = require("./routes/search");
const userRouter = require("./routes/user");
const savedRouter = require("./routes/saved");
const dealsRouter = require("./routes/deals");
const spendingRouter = require("./routes/spending");

app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/deals", dealsRouter);

app.use(
  "/spending",
  passport.authenticate("local-jwt", { session: false }),
  spendingRouter
);

app.use(
  "/saveditems",
  passport.authenticate("local-jwt", { session: false }),
  savedRouter
);

//Authenticate with JWT whenever accessing this route
app.use(
  "/user",
  passport.authenticate("local-jwt", { session: false }),
  userRouter
);

//Chat

const httpserver = http.createServer(app);

const io = SocketIo(httpserver); // < Interesting!

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

httpserver.listen(5001, () => {
  console.log("http server listening on port 5001");
});

app.post("/messages", (req, res) => {
  io.emit("message", req.body);
  res.send(req.body);
});
