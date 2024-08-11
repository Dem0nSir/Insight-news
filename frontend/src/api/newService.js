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
import axios from 'axios';
import { db } from "../services/firebaseF";
import { doc, getDoc } from 'firebase/firestore';

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

export const searchNews = async (searchQuery) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { q: searchQuery }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};
