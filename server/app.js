const express = require("express");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./database");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use(userRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
