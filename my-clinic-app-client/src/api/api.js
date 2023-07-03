import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/medclinic', // Replace with your API base URL
});


// // During production deployment, you would need to replace
//  'http://localhost:5000/medclinic' with the actual URL where your
//   backend API is hosted.