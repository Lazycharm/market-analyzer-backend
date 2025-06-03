const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files from the frontend build
app.use(express.static(path.join(__dirname, 'frontend')));

// API route to fetch price
app.get('/api/price/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toLowerCase();
  console.log("Fetching price for:", symbol); // just for debugging

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Price fetch error:", error.message);
    res.status(500).json({ error: "Unable to fetch price." });
  }
});

// React routing fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
