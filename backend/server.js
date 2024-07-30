const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = 'e51cd847e41e4bccbade9e2e00ba6312';

// Create a new cache with a default TTL of 24 hours (in seconds)
const cache = new NodeCache({ stdTTL: 24 * 60 * 60 });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

async function fetchNewsFromAPI() {
  const response = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      country: 'us',
      category: 'business',
      apiKey: NEWS_API_KEY
    }
  });
  return response.data;
}

app.get('/news', async (req, res) => {
  try {
    let news = cache.get('dailyNews');
    if (news == undefined) {
      // If not in cache, fetch from API
      news = await fetchNewsFromAPI();
      // Store in cache
      cache.set('dailyNews', news);
    }
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});