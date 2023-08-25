import axiosCliente from './axios';

export const createSalidaPriv = async (movimiento) => await axiosCliente.post('/salidaPriv', movimiento);
export const createInventarioPriv = async (movimiento) => await axiosCliente.post('/inventarioPriv', movimiento);
export const createEntradaPriv = async (movimiento) => await axiosCliente.post('/entradaPriv', movimiento);
export const obtenerListaPrivado = async () => await axiosCliente.get('/listaPrivado');
export const obtenerBalancePriv = async () => await axiosCliente.get('/balancePriv');