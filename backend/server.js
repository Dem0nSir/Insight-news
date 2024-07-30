const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = 'e51cd847e41e4bccbade9e2e00ba6312';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: 'business',
        apiKey: NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
