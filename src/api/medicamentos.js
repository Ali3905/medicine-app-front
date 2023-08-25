import axiosCliente from "./axios";

export const createMedicamento = async (medicamento) => await axiosCliente.post('/nuevoMedicamento', medicamento);
export const obtenerMedicamentos = async () => await axiosCliente.get('/medicamentos');
export const buscarMedicamentos = async (nombre) => await axiosCliente.get(`/api/medicamentos/${nombre}`);
export const unMedicamento = async (id) => await axiosCliente.get(`/medicamentos/${id}`);
export const buscarMedicamentosS = async (nombre, centro) => await axiosCliente.get(`/api/medicamentosS/${nombre}/${centro}`);
export const cambiarMedicamento = async (medicamento) => await axiosCliente.post('/cambiarMedicamento/', medicamento);
export const buscarMedicamentosHdD = async (nombre) => await axiosCliente.get(`/api/medicamentosHdD/${nombre}`);
export const buscarMedicamentosPriv = async (nombre) => await axiosCliente.get(`/api/medicamentosPriv/${nombre}`);
export const obtenerListaHdd = async () => await axiosCliente.get('/listaHdd');