// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const NodeCache = require('node-cache');

// const app = express();
// const PORT = process.env.PORT || 5000;
// const NEWS_API_KEY = 'e51cd847e41e4bccbade9e2e00ba6312';

// // Create a new cache with a default TTL of 24 hours (in seconds)
// const cache = new NodeCache({ stdTTL: 24 * 60 * 60 });

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// // async function fetchNewsFromAPI() {
// //   const response = await axios.get('https://newsapi.org/v2/everything', {
// //     params: {
// //       country: 'us',
// //       category: 'sport',
// //       apiKey: NEWS_API_KEY
// //     }
// //   });
// //   return response.data;
// // }

// async function fetchNewsFromAPI() {
//   const response = await axios.get('https://newsapi.org/v2/everything', {
//     params: {
//       q: 'bitcoin', 
//       apiKey: NEWS_API_KEY
//     }
//   });
//   return response.data;
// }

// app.get('/news', async (req, res) => {
//   try {
//     let news = cache.get('dailyNews');
//     if (news == undefined) {
//       // If not in cache, fetch from API
//       news = await fetchNewsFromAPI();
//       // Store in cache
//       cache.set('dailyNews', news);
//     }
//     res.json(news);
//   } catch (error) {
//     console.error('Error fetching news:', error.message);
//     res.status(500).json({ error: 'Failed to fetch news', details: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const admin = require('./firebaseAdmin');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = 'e51cd847e41e4bccbade9e2e00ba6312';


const db = admin.firestore();

async function fetchNewsFromAPI(category) {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category,
        apiKey: NEWS_API_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
}

async function fetchAndSaveAllNews() {
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  const allNews = {};

  for (const category of categories) {
    allNews[category] = await fetchNewsFromAPI(category);
  }

  const today = new Date().toISOString().split('T')[0];

  try {
    await db.collection('dailyNews').doc(today).set(allNews);
    console.log(`News for ${today} saved successfully to Firestore`);
  } catch (error) {
    console.error('Error saving news to Firestore:', error);
  }

  return allNews;
}

async function getTodaysNews() {
  const today = new Date().toISOString().split('T')[0];
  const docRef = db.collection('dailyNews').doc(today);

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      console.log('Returning news from Firestore');
      return doc.data();
    } else {
      console.log('Fetching and saving new news');
      return await fetchAndSaveAllNews();
    }
  } catch (error) {
    console.error('Error getting news:', error);
    throw error;
  }
}

// Function to check if it's a new day
function isNewDay(lastFetchDate) {
  const now = new Date();
  return now.toDateString() !== lastFetchDate.toDateString();
}

let lastFetchDate = new Date(0); // Initialize with a past date

// Fetch news once a day
async function fetchNewsDaily() {
  if (isNewDay(lastFetchDate)) {
    console.log('Fetching news for the new day');
    await fetchAndSaveAllNews();
    lastFetchDate = new Date();
  }
}

// Schedule the daily fetch
setInterval(fetchNewsDaily, 1000 * 60 * 60); // Check every hour

// Fetch news immediately when the server starts
fetchNewsDaily();

app.get('/news', async (req, res) => {
  try {
    const news = await getTodaysNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: q,
        apiKey: NEWS_API_KEY,
        language: 'en',
        // sortBy: 'publishedAt' 
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'An error occurred while searching for news' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ZLZAHmUvEVJJCAICEcCmwTJiaEjOxVQnDSvOiTsGFwFMZGFKCt