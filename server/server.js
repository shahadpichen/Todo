const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const todoRoutes = require("./routes/todoRoute");

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
