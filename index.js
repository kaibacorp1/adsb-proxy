const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/planes', async (req, res) => {
  try {
    const response = await fetch('https://api.adsb.lol/api/states/all?lamin=-90&lamax=90&lomin=-180&lomax=180');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch aircraft data.' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
