const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/scrape', async (req, res) => {
  const url = req.query.url;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract data from the page
    const data = await page.evaluate(() => {
      const title = document.querySelector('meta[property="og:title"]')?.content || document.title || 'No title found';
      const publishDate = document.querySelector('meta[property="article:published_time"]')?.content || 'No date found';
      const image = document.querySelector('meta[property="og:image"]')?.content || '';
      const articleText = document.querySelector('article')?.innerText || document.body.innerText || '';
      const brief = articleText.split('.').slice(0, 2).join('. ') + '.';
      const fullContent = document.documentElement.innerHTML;

      return { title, publishDate, image, articleText, brief, fullContent };
    });

    await browser.close();

    // Send the full content and the extracted data as response
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape the article' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
