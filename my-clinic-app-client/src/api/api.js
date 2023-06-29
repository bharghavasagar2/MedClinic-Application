import axios from 'axios';

export const api = axios.create({
  baseURL: '/metclinic', // Replace with your API base URL
});


