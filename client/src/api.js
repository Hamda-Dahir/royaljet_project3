import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// user section api starting

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: {
        cache_buster: Date.now(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// user section api ending

// expense section api starting
export const getAllExpenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses`, {
      params: {
        cache_buster: Date.now(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${BASE_URL}/expenses`, expenseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExpense = async (expenseId, expenseData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/expenses/${expenseId}`,
      expenseData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// expense section api ending

/* starting orders api */
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`, {
      params: {
        cache_buster: Date.now(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/orders/${orderId}`,
      orderData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ending orders api */
