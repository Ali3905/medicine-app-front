import {  createContext, useContext } from "react";
import { createMedicamento, obtenerMedicamentos, unMedicamento, buscarMedicamentos, cambiarMedicamento, obtenerListaHdd } from "../api/medicamentos";
import { obtenerListaPrivado } from "../api/privado";

const MedicamentoContext = createContext();

export function useMedicamento() {
    const context = useContext(MedicamentoContext);
    if (!context) {
        throw new Error('useCuenta debe estar dentro del proveedor CuentaContext');
    }
    return context;
}

export function MedicamentoProvider({ children }) {
    
  
    const nuevoFarmaco = async (nombre) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        await createMedicamento(nombre);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear el medicamento:', error);
      }
    };
  
    const getMedicamentos = async () => {
      const res = await obtenerMedicamentos();
      return res.data;
    };

    const getMedicamentosPrivado = async () => {
      const res = await obtenerListaPrivado();
      return res.data;
    };

    const getMedicamentosHDD = async () => {
      const res = await obtenerListaHdd();
      console.log(res.data)
      return res.data;
     
    };

    const oneMedicamento = async (id) => {
    const res = await unMedicamento(id);
      return res.data;
    };

    const editoMedicamento = async (medicicine) => {
       await cambiarMedicamento(medicicine);
    };
  
  
const busquedaFarmaco = async (nombre) => {
    try {
      const response = await buscarMedicamentos(nombre);
      return response.data;
    } catch (error) {
    
      console.error('Error fetching search results:', error);
      return []; // or throw an error or handle it based on your requirement
    }
  };
  

  
    return (
      <MedicamentoContext.Provider value={{ nuevoFarmaco, getMedicamentos, oneMedicamento,
       busquedaFarmaco, editoMedicamento, getMedicamentosPrivado, getMedicamentosHDD}}>
        {children}
      </MedicamentoContext.Provider>
    );
  }
  
