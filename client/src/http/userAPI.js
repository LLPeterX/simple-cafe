import { $host, $authHost } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/register', { email, password, role: 'ADMIN' });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token); // объект {id, email, role, iat, exp}
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
}

export const checkAuth = async () => {
  const { data } = await $authHost.get('api/user/auth');
  //console.log('checkAuth:', data, jwt_decode(data.token));
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
}
