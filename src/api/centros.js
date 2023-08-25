import axiosCliente from './axios';

export const obtenerCentros = async () => await axiosCliente.get('/allCentros');
export const getMovimientosByCentro = async (centro) => await axiosCliente.get(`/movimientosCentro/${centro}`);
export const getStockMovCentro = async (id) => await axiosCliente.get(`/stockMovSelec/${id}`);
export const getStockCentroMeses = async (centro) => await axiosCliente.get(`/getMonthCentroMedicine/${centro}`);
