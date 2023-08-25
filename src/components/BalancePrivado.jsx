import { useMovimiento } from '../context/MovimientosContex';
import { useState, useEffect, useCallback} from 'react';
import '../styles/TablaCentros.css';


const BalancePrivado = () => {
   
    const { balancePrivado } = useMovimiento();
    const [medicamentos, setMedicamentos] = useState([]);

   

    const getBalanceP = useCallback(async () => {
        try {
            
          const data = await balancePrivado();
      
          setMedicamentos(data);
         
        } catch (error) {
          console.error('Error loading medicamentos:', error);
        }
      },  [balancePrivado]);  

      useEffect(() => {
        // Load the medicamentos when the component mounts
        getBalanceP();
        }, []);

  return (
    <div>
         <div className='centered-container'>

<div>
      <h2 className='text-center my-3'>Balancete</h2>
    
        <table className='tableC'>
        <thead>
          <tr>
            <th scope='col'>Medicamento</th>
            <th scope='col'>Inventario</th>
            <th scope='col'>Entradas</th>
            <th scope='col'>Saídas</th>
            <th scope='col'>Saldo</th>
            
          </tr>
        </thead>
        <tbody>
          
        {medicamentos && medicamentos.map((medicamento) => (
                <tr key={medicamento.nombre}>
                <td>{medicamento.medicamento}</td>
                <td>{medicamento.inventario}</td>
                <td>{medicamento.entradas}</td>
                <td>{medicamento.salidas}</td>
                <td>{medicamento.saldo}</td>

                </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  )
}

export default BalancePrivado