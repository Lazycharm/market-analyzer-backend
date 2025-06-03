const express = require('express');
const path = require('path');
const app = express();

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Your API routes (if any)
app.use('/api', require('./routes/your-api-file')); // if you have this

// Catch-all to send frontend's index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
