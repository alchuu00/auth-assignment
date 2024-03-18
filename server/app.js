const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./database');
const app = express();

app.use(express.json());

// Use the user routes
app.use(userRoutes);

// Define the port and start the server
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
