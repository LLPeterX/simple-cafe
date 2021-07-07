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