import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
