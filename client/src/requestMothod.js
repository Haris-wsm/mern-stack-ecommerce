import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
const TOKEN = JSON.parse(
  JSON.parse(localStorage.getItem('persist:root') || '')?.user
)?.curresntUser?.accessToken;

const STRIPE_AUTH_TOKEN = process.env.REACT_APP_STRIPE_SECRET;

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const publicRequestWithStripeToken = axios.create({
  baseURL: BASE_URL,
  header: { Authorization: `Bearer ${STRIPE_AUTH_TOKEN}` }
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` }
});
