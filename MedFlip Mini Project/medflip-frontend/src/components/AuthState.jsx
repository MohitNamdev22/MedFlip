// AuthState.jsx

import { atom, selector } from 'recoil';
import axios from 'axios';

// Define an atom to store the authentication status
export const isAuthenticatedState = atom({
  key: 'isAuthenticatedState',
  default: false, // Assuming default is false
});

// Define an atom to store the user's name
export const userNameState = atom({
  key: 'userNameState',
  default: null, // Assuming default is an empty string
});

// Define a selector to fetch the user's authentication status
export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: async ({ get }) => {
    // You can fetch authentication status from your backend
    // For demonstration, let's assume we fetch it from a REST API
    try {
      const response = await axios.get('http://localhost:3000/auth/checkAuth');
      return response.data.isAuthenticated;
    } catch (error) {
      console.error('Error fetching authentication status:', error);
      return false; // Default to false if there's an error
    }
  },
});

// Define a selector to fetch the user's name
export const userNameSelector = selector({
  key: 'userNameSelector',
  get: ({ get }) => {
    const userName = get(userNameState);
    return userName === null ? 'Loading...' : userName; // Handle loading state
  },
});