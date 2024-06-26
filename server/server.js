const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const todoRoutes = require("./routes/todoRoute");
const chatRoutes = require("./routes/chatRoutes");
const oauthRoutes = require("./routes/oauthRoutes");
const messageRoutes = require("./routes/messageRoutes");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(bodyParser.json());

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.use("/oauths", oauthRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
