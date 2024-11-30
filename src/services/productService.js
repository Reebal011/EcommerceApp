import axios from 'axios';
import {API_URL} from '../utils/constants';

const BASE_URL = `${API_URL}/products`;

export const fetchProducts = async (category = '') => {
  try {
    const url = category ? `${BASE_URL}/category/${category}` : BASE_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
