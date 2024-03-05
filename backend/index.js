const express = require("express");
const app = express();
const mainRouter = require('./routes/index');

const cors = require('cors'); // Import the cors middleware
// Use the cors middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1', mainRouter);

// Other middleware and configurations...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
