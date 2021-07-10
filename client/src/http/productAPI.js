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
export const fetchProducts = async (page = 1, limit = 3, productTypeId, vegan, available) => {
  let options = { page, limit };
  if (productTypeId) {
    options.productTypeId = productTypeId;
  }
  if (vegan) {
    options.vegan = 1;
  }
  if (available) {
    options.available = 1;
  }
  console.log('fetch prods with ops', options);
  const { data } = await $host.get('api/product', { params: options });
  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get(`api/product/${id}`);
  return data;
};