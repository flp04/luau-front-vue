import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export default {
  login(credentials) {
    return apiClient.post('/login', credentials);
  },

  getItems() {
    return apiClient.get('/items');
  },

  getItem(id) {
    return apiClient.get(`/items/${id}`);
  },
};