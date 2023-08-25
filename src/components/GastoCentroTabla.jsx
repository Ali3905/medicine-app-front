import { useState, useEffect } from 'react';
import { useCentros } from '../context/CentrosContex';
import '../styles/TablaCentros.css';
const GastoCentroTabla = () => {
    const { centros, getCentros, getStockCentroMes} = useCentros();
    const [monthlyStockData, setMonthlyStockData] = useState([]);
    const [selectedCentro, setSelectedCentro] = useState('');
    


   
        // Llamar a la función para obtener la lista de centros
        const fetchCentros = async () => {
          try {
            const centrosData = await getCentros();
            if (centrosData.length > 0) {
              setSelectedCentro(centrosData[0].id); // Establecer el primer centro como seleccionado por defecto
            }
          } catch (error) {
            console.error('Error fetching centros:', error);
          }
        };
        
      
    
    
      useEffect(() => {
        if (selectedCentro) {
          // Llamar a la función para obtener los movimientos del centro seleccionado
          const fetchStockMes = async () => {
            try {
              const movimientosData = await getStockCentroMes(selectedCentro);
              console.log(movimientosData)
              setMonthlyStockData(movimientosData);
            } catch (error) {
              console.error('Error fetching movimientos:', error);
            }
          };
    
          fetchStockMes();
        }
      }, [selectedCentro, getStockCentroMes]);
    
      const handleCentroChange = (event) => {
        fetchCentros();
        const selectedId = event.target.value;
        setSelectedCentro(selectedId);
      };

  return (
    <div>
         <div className='centered-container'>
<label htmlFor="centroSelector" style={{ fontSize: '30px', marginBottom: '10px', marginTop:'10px' }}></label>
    <select style={{ fontSize: '30px', marginBottom: '20px', marginTop:'10px' }} id="centroSelector" value={selectedCentro} onChange={handleCentroChange}>
<option style={{ fontSize: '20px' }} value="">Selecciona un centro</option> {/* Opción predeterminada */}
{centros.map((centro) => (
  <option key={centro.id} value={centro.id}>
    {centro.nombre}
  </option>
))}
</select>

<div>
      <h2 className='text-center my-3'>Entrega Mensal</h2>
    
        <table className='tableC'>
        <thead>
          <tr>
            <th scope='col'>Medicamento</th>
            <th scope='col'>Jan</th>
            <th scope='col'>Fev</th>
            <th scope='col'>Mar</th>
            <th scope='col'>Abr</th>
            <th scope='col'>Mai</th>
            <th scope='col'>Jun</th>
            <th scope='col'>Jul</th>
            <th scope='col'>Ago</th>
            <th scope='col'>Set</th>
            <th scope='col'>Out</th>
            <th scope='col'>Nov</th>
            <th scope='col'>Dez</th>
          </tr>
        </thead>
        <tbody>
          {monthlyStockData.map((item) => (
            <tr key={item.medicamento}>
              <td className='text-left'>{item.medicamento}</td>
              {item.meses.map((mesData, index) => (
                <td key={index} className='text-center'>{mesData.totalSalida}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  )
}

export default GastoCentroTabla