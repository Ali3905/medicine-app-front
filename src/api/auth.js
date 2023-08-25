import axiosCliente from './axios';

export const registerRequest = async (newUser) => await axiosCliente.post(`/api/registro`, newUser);
export const loginRequest = async (user) => await axiosCliente.post(`/login`, user);
export const verifyRequest = async () => await axiosCliente.get(`/api/verify`);
