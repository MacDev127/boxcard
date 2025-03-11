// src/server.js
require('dotenv').config(); // Load .env variables
const app = require('./app');

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
