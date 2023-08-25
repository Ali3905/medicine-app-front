import { useState, useEffect, useCallback } from 'react';
import { useCentros } from '../context/CentrosContex';
import '../styles/Modal.css';
import '../styles/TablaCentros.css';

import { format } from 'date-fns';

const CentrosVista = () => {
  const { centros, getCentros, getMovimientosCentro,  getStockMov } = useCentros();
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedMovimiento, setSelectedMovimiento] = useState(null); // Estado para almacenar el movimiento seleccionado
  const [selectedCentro, setSelectedCentro] = useState('');
  const [movimientos, setMovimientos] = useState([]);
  

    // Llamar a la función para obtener la lista de centros
    const fetchCentros = useCallback(async () => {
      try {
        const centrosData = await getCentros();
        if (centrosData.length > 0) {
          setSelectedCentro(centrosData[0].id); // Establecer el primer centro como seleccionado por defecto
        }
      } catch (error) {
        console.error('Error fetching centros:', error);
      }
    },  [getCentros]);
   

    useEffect(() => {
      // Llamar a la función para obtener la lista de centros
      fetchCentros();
    }, []);
  


  useEffect(() => {
    if (selectedCentro) {
      // Llamar a la función para obtener los movimientos del centro seleccionado
      const fetchMovimientos = async () => {
        try {
          const movimientosData = await getMovimientosCentro(selectedCentro);
          console.log(movimientosData)
          setMovimientos(movimientosData);
        } catch (error) {
          console.error('Error fetching movimientos:', error);
        }
      };

      fetchMovimientos();
    }
  }, [selectedCentro, getMovimientosCentro]);

  const handleCentroChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCentro(selectedId);
  };

  const handleVerMedicamentos = async (movimiento) => {
    console.log(movimiento._id)
    setShowModal(true);
    setSelectedMovimiento(movimiento); // Set the movement data
    
    try {
      const stockData = await getStockMov(movimiento._id); // Fetch stock data based on the movement's ID
      setSelectedMovimiento(prevMovimiento => ({
        ...prevMovimiento,
        stock: stockData, // Add the stock data to the movement data
      }));
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

 
  useEffect(() => {
    console.log("Selected Movimiento:", selectedMovimiento);
  }, [selectedMovimiento]);

  return (
    <div className='page'>
    <div className='centered-container'>
<label htmlFor="centroSelector" style={{ fontSize: '30px', marginBottom: '20px', marginTop:'20px' }}></label>
    <select style={{ fontSize: '30px', marginBottom: '30px', marginTop:'20px' }} id="centroSelector" value={selectedCentro} onChange={handleCentroChange}>
<option style={{ fontSize: '20px' }} value="">Selecciona un centro</option> {/* Opción predeterminada */}
{centros.map((centro) => (
  <option key={centro.id} value={centro.id}>
    {centro.nombre}
  </option>
))}
</select>


      <h2>Movimientos del Centro: {selectedCentro}</h2>
     
      <table className="tableM">
  <thead>
    <tr>
      <th>Fecha</th>
      <th>Tipo</th>
      <th>Pessoal</th>
      <th>Ver</th>
    </tr>
  </thead>
  <tbody>
    {movimientos.map((movimiento) => (
      <tr key={movimiento.id}>
        <td>{movimiento.fecha && format(new Date(movimiento.fecha), 'dd/MM/yyyy')}</td>
        <td>{movimiento.tipo}</td>
        <td>{movimiento.quien}</td>
        <td style={{ textAlign: 'center' }}>
          <button className="btn-ver" onClick={() => handleVerMedicamentos(movimiento)}>Ver</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

         {/* Modal para mostrar los medicamentos */}
        {showModal && (
       <div className="modal-container">
          <div className="modal-content">
           
            <h2>Medicamentos del movimiento: {selectedMovimiento.centro}</h2>
            
      
            
          <tr>
      <th><strong>Fecha:</strong> {format(new Date(selectedMovimiento.fecha), 'dd/MM/yyyy')}</th>
      <th><strong>Tipo:</strong> {selectedMovimiento.tipo}</th>
      </tr>
      <div className='table pt-2'>
      <table className="tableC table-flush">
        <thead className="thead-light">
        <tr>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">CANTIDAD</th>
                        <th scope="col">CADUCIDADE</th>
          </tr>              
      </thead>
      <tbody>
      {selectedMovimiento.stock && selectedMovimiento.stock.map((medicamento, index) => {
                const isMedicamentoExpired = (caducidad) => {
                  const currentDate = new Date();
                  const threeMonthsLater = new Date();
                  threeMonthsLater.setMonth(currentDate.getMonth() + 3);
                  const caducidadDate = new Date(caducidad);
                  return caducidadDate < threeMonthsLater;
                };
                  return (
           
             <tr key={medicamento.medId}>
                 <th>{medicamento.nombre}</th> 
                  
                  <th>{medicamento.cantidad}</th>
                  
                  <th className={isMedicamentoExpired(medicamento.caducidad) ? 'expired-date' : ''}>
  {medicamento.caducidad && format(new Date(medicamento.caducidad), 'MM/yyyy')}
</th>



                </tr>
              );
            })}

                </tbody>
                <tfooter>
                <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
              </div>
                </tfooter>
             
            </table>
            </div>
          </div>
        </div>
       
      )}
    </div>
   </div>
  );
};

export default CentrosVista;

  