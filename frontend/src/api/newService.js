// src/api/newsService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchNews = async (url) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scrape`, {
      params: { url },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};