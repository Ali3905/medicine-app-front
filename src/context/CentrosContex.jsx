import {  createContext, useContext } from "react";
import { obtenerCentros, getMovimientosByCentro, getStockMovCentro, getStockCentroMeses } from "../api/centros";
import { useState } from "react";
export const CentrosContext = createContext();

export function useCentros() {
    const context = useContext(CentrosContext);
    if (!context) {
        throw new Error('useCuenta debe estar dentro del proveedor CuentaContext');
    }
    return context;
}

export function CentrosProvider({ children }) {
    const [centros, setCentros] = useState([]);

    const getCentros = async () => {
        const res = await obtenerCentros();

        setCentros(res.data);
      };

      const getMovimientosCentro = async (centro) => {
        const res = await getMovimientosByCentro(centro);
        return res.data;
        };

        const getStockMov = async (id) => {
          console.log(id);
          const res = await getStockMovCentro(id);
          return res.data;
          };

       const getStockCentroMes = async (centro) => {
        const res = await getStockCentroMeses(centro);
        return res.data;
        };   

    return (
        <CentrosContext.Provider value={{centros, getCentros, getMovimientosCentro, getStockMov, getStockCentroMes}}>
          {children}
        </CentrosContext.Provider>
      );
    }
