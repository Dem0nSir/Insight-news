// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';

// export const fetchNews = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/news`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     throw error;
//   }
// };

// frontend/src/api/newsService.js

import { db } from "../services/firebaseF";
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchNews = async () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const newsDoc = doc(db, 'dailyNews', formattedDate);
  
  const docSnap = await getDoc(newsDoc);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('No such document!');
  }
};

export const fetchCategorizedNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categorized news:', error);
    throw error;
  }
};

export const searchNews = async (searchQuery) => {
  try {
    console.log('Attempting to search for:', searchQuery);
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { q: searchQuery }
    });
    console.log('Search response:', response);
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const getSentiment = async (text) => {
  if (!text) return 'Unknown';
  
  try {
    const response = await fetch(`${API_BASE_URL}/sentiment`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.sentiment; 
  } catch (error) {
    console.error('Error fetching sentiment:', error);
    return 'Unknown';
  }
};
