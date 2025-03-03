//starter_project\src\server\index.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Constants
const UDACITY_API_ENDPOINT = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';
const MAX_TEXT_LENGTH = 200;

const scrapeText = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract and clean text
    const text = $('article').text() || $('main').text() || $('body').text();
    return text.trim().substring(0, MAX_TEXT_LENGTH);
  } catch (error) {
    throw new Error('Failed to scrape website content');
  }
};

app.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) throw new Error('URL is required');
    
    // Scrape and prepare text
    const rawText = await scrapeText(url);
    const cleanText = rawText.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ');

    // Call Udacity AWS API
    const apiResponse = await fetch(UDACITY_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText })
    });

    if (!apiResponse.ok) throw new Error('API analysis failed');
    
    const analysis = await apiResponse.json();
    
    res.json({
      sentiment: analysis.sentiment,
      scores: analysis.sentiment_scores,
      text: analysis.text
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: error.message.includes('Failed to scrape') 
        ? 'Invalid or inaccessible website URL' 
        : 'Analysis failed. Please try again later.'
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));