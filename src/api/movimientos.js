import axiosCliente from './axios';

export const createSalida = async (movimiento) => await axiosCliente.post('/nuevaSalidaAlmacen', movimiento);
export const getMovimientos = async () => await axiosCliente.get('/movimientos');
export const createEntrada = async (movimiento) => await axiosCliente.post('/nuevaEntradaAlmacen', movimiento);
export const createInventario = async (movimiento) => await axiosCliente.post('/createInventario', movimiento);
export const salidaDeHdD = async (movimiento) => await axiosCliente.post('/salidaDeHdD', movimiento);
export const createInventarioHdd = async (movimiento) => await axiosCliente.post('/inventarioHdD', movimiento);
export const balanceHdd = async () => await axiosCliente.get('/balanceteHdD');
export const balanceDep = async () => await axiosCliente.get('/balanceteDep');