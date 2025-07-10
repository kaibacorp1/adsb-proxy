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
      'https://api.adsb.lol/api/states/all?lamin=-90&lamax=90&lomin=-180&lomax=180',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json'
        }
      }
    );

    const text = await response.text(); // get raw response first
    console.log('Fetched raw response:', text.slice(0, 500)); // print first 500 chars

    // Try parsing JSON (only if valid)
    const data = JSON.parse(text);
    res.json(data);
  } catch (error) {
    console.error('Error fetching or parsing plane data:', error);
    res.status(500).json({ error: 'Failed to fetch plane data' });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
