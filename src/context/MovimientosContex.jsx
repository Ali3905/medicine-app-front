import { useState, createContext, useContext } from "react";
import { createSalida, getMovimientos, createEntrada, createInventario, salidaDeHdD, createInventarioHdd, balanceHdd, balanceDep } from "../api/movimientos";
import { createEntradaPriv, createInventarioPriv, createSalidaPriv, obtenerBalancePriv } from "../api/privado";


const MovimientoContext = createContext();

export function useMovimiento() {
    const context = useContext(MovimientoContext);
    if (!context) {
        throw new Error('useCuenta debe estar dentro del proveedor CuentaContext');
    }
    return context;
}

export function MovimientoProvider({ children }) {
    const [movimiento, setMovimiento] = useState([]);
  
    const createSalidaPrivado = async (nuevaSalidaData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await createSalidaPriv(nuevaSalidaData);
  
          // Agregamos la nueva cuenta al estado actual
          setMovimiento([...movimiento, data]);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };

    const nuevaSalida = async (nuevaSalidaData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await createSalida(nuevaSalidaData);
  
          // Agregamos la nueva cuenta al estado actual
          setMovimiento([...movimiento, data]);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };

    const nuevaEntrada = async (nuevaEntradaData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await createEntrada(nuevaEntradaData);
  
          // Agregamos la nueva cuenta al estado actual
          setMovimiento([...movimiento, data]);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };

    const createEntradaPrivado = async (nuevaEntradaData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await createEntradaPriv(nuevaEntradaData);
  
          // Agregamos la nueva cuenta al estado actual
          setMovimiento([...movimiento, data]);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };
  
    const allMovimientos = async () => {
      const res = await getMovimientos();
      setMovimiento(res.data);
    };

    const balanceFarmacia = async () => {
      const res = await balanceHdd();
      console.log(res.data);
      setMovimiento(res.data);
      return res.data;
    };

    const balanceDeposito = async () => {
      const res = await balanceDep();
      console.log(res.data);
      setMovimiento(res.data);
      return res.data;
    };

    const balancePrivado = async () => {
      const res = await obtenerBalancePriv();
      console.log(res.data);
      setMovimiento(res.data);
      return res.data;
    };
  
    const nuevoInventario = async (nuevaInventarioData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await createInventario(nuevaInventarioData);
  
          // Agregamos la nueva cuenta al estado actual
          setMovimiento([...movimiento, data]);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };

    const inventarioHdd = async (inventarioData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await createInventarioHdd(inventarioData);
  
          // Agregamos la nueva cuenta al estado actual
          setMovimiento([...movimiento, data]);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };

    const inventarioPrivado = async (inventarioData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await createInventarioPriv(inventarioData);
  
          // Agregamos la nueva cuenta al estado actual
          setMovimiento([...movimiento, data]);
      
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };

  const salidaHdD = async (salidaHdDData) => {
      try {
        // Envías la solicitud al servidor para crear la nueva cuenta
        const {data} = await salidaDeHdD(salidaHdDData);
        setMovimiento([...movimiento, data]);
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error al crear la cuenta:', error);
      }
    };

  
    return (
      <MovimientoContext.Provider value={{ movimiento, nuevaSalida,nuevaEntrada,nuevoInventario, allMovimientos,
       salidaHdD, inventarioHdd, createEntradaPrivado, inventarioPrivado, createSalidaPrivado, balanceFarmacia,
       balanceDeposito, balancePrivado}}>
        {children}
      </MovimientoContext.Provider>
    );
  }
  
