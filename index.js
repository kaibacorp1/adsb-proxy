const express = require('express');
const fetch = require('node-fetch');

const app = express();

// Use the port Render gives us
const port = process.env.PORT;

// Simple root check
app.get('/', (req, res) => {
  res.send('✅ Proxy is live');
});

// /planes route
app.get('/planes', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.adsb.lol/api/states/all?lamin=-90&lamax=90&lomin=-180&lomax=180'
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching plane data:', error);
    res.status(500).json({ error: 'Failed to fetch plane data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
