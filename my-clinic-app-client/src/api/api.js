import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/metclinic', // Replace with your API base URL
});


