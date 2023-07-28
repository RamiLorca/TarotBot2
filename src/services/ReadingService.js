import axios from 'axios';
import store from '@/store';

const api = axios.create({
    baseURL: `https://tarotbotbackend-production.up.railway.app`,
    timeout: 5000,
    headers: {
      "Content-Type": `application/json`,
    },
  });

  export const getTarotReading = async (message) => {
    try {
      const response = await api.post(`/reading`, {
        model: "text-davinci-003",
        prompt: message,
        temperature: 0.7,
        max_tokens: 2000,
      });
      store.commit('setTarotReading', response.data.choices[0].text);
      return response.data.choices[0].text;
    } catch (error) {
      throw new Error('Failed to get tarot reading.');
    }
  };