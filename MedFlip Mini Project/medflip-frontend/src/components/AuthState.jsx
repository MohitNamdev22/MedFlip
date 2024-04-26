
import { atom, selector } from 'recoil';
import axios from 'axios';

export const isAuthenticatedState = atom({
  key: 'isAuthenticatedState',
  default: false,
});

export const userNameState = atom({
  key: 'userNameState',
  default: null, 
});

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: async ({ get }) => {
    try {
      const response = await axios.get('https://backend-medflip.onrender.com/auth/checkAuth');
      return response.data.isAuthenticated;
    } catch (error) {
      console.error('Error fetching authentication status:', error);
      return false; 
    }
  },
});

export const userNameSelector = selector({
  key: 'userNameSelector',
  get: ({ get }) => {
    const userName = get(userNameState);
    return userName === null ? 'Loading...' : userName;
  },
});