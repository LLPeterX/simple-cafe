import { $host, $authHost } from './index'
//import jwt_decode from 'jwt-decode'

// создание типа. Нужен авторизованный пользователь, поэтому на authHost
export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;

};
// Получение всего списка типов продуктов
export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;

};

// создание типа. Нужен авторизованный пользователь, поэтому на authHost
export const createProduct = async (product) => {
  const { data } = await $authHost.post('api/product', product);
  return data;

};
// Получение всего списка типов продуктов
export const fetchProducts = async () => {
  const { data } = await $host.get('api/product');
  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get(`api/product/${id}`);
  return data;
};