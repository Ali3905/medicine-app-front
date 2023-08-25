import React, { useState, useEffect, useCallback } from 'react';
import { buscarMedicamentosS } from '../api/medicamentos';
import { useMovimiento } from '../context/MovimientosContex';
import { useCentros } from '../context/CentrosContex';
import '../styles/TablaCentros.css';



const MedicineForm = () => {
  const [medicines, setMedicines] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCentro, setSelectedCentro] = useState('');
  const { centros, getCentros } = useCentros();


  const { nuevaSalida } = useMovimiento();
 


    // Llamar a la función para obtener la lista de centros
    const buscaCentros = useCallback(async () => {
      try {
        const centrosData = await getCentros();
        if (centrosData.length > 0) {
          setSelectedCentro(centrosData[0].id);
        }
      } catch (error) {
        console.error('Error fetching centros:', error);
      }
    }, [getCentros]);
  
    useEffect(() => {
      buscaCentros();
    }, []);
    
    // Llamar a la función para obtener la lista de centros
  
   

const handleSearch = async (nombre) => {
  console.log('nombre:', nombre)
  console.log('centro:', selectedCentro)  
  try {
    const response = await buscarMedicamentosS(nombre, selectedCentro); // Pass the nombre directly as a string
    setSearchResults(response.data);
    setShowSearchResults(true);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};
 

  const handleCenterChange = (event) => {
  
    const selectedId = event.target.value;
    setSelectedCentro(selectedId);
  };


  const handleGuardarSubmit = async (e) => {
    e.preventDefault();
   console.log('selectedCentro:', selectedCentro)
    // Validations can be added here, e.g., check if fields are empty
    const newMovimiento = {
      centro: selectedCentro,
      medicamentos: medicines,
    };
 
    console.log('newMovimiento:', newMovimiento);
  
    try {
      const result = await nuevaSalida(newMovimiento);
      console.log('Movimiento creado:');
      console.log(result);
      setMedicines([]);
    } catch (error) {
      console.log('Error al crear el movimiento:', error);
    }
  
  };

 

  const handleTableSubmit = (e) => {
    e.preventDefault();
    // Validations can be added here, e.g., check if fields are empty
    const selectedMedicine = searchResults.find((result) => result.nombre === nombre);

    if (selectedMedicine) {
      const newMedicine = {
        _id: selectedMedicine._id, // Include the _id of the selected medicine
        nombre: selectedMedicine.nombre,
        cantidad,
    
      };
      

    setMedicines([...medicines, newMedicine]);
  
    console.log('Medicamento añadido:');
    console.log(newMedicine);

    // Reset form fields after saving
    setNombre('');
    setCantidad('');
  
    setShowSearchResults(false);
    
  };

};const handleSearchResultClick = (nombre) => {
  setNombre(nombre);
  setShowSearchResults(false); // Hide the search results when a medicine is selected
};

const handleDeleteMedicine = (index) => {
  const updatedMedicines = [...medicines];
  updatedMedicines.splice(index, 1);
  setMedicines(updatedMedicines);
};


  return (
    <div className="d-flex">
   
        <div className='card text-black border-radius: 25px;'>
        <div className='card-head mt-3'>
        
         <p className='text-center fs-3'>Añadir Medicamento</p>
         <div className="mr-4">
      <div className='card-body'>
      <form className='mx-5' onSubmit={handleTableSubmit}>
      <label htmlFor="centroSelector" style={{ fontSize: '30px', marginBottom: '10px', marginTop:'10px' }}></label>
    <select style={{ fontSize: '30px', marginBottom: '20px', marginTop:'10px' }} id="centroSelector" value={selectedCentro} onChange={handleCenterChange}>
<option style={{ fontSize: '20px' }} value="">Selecciona un centro</option> {/* Opción predeterminada */}
{centros.map((centro) => (
  <option key={centro.id} value={centro.id}>
    {centro.nombre}
  </option>
))}
</select>
  
        <div>
        <label className="px-4 form-label fs-5" htmlFor='name'>  Medicamento:</label>
          </div>
        <label>
        
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              handleSearch(e.target.value);
            }}
            className='rounded-pill px-4 py-2 text-xl w-100'
          />
          {/* Show search results */}
          {showSearchResults && searchResults.length > 0 && (
            <ul>
              {searchResults.map((result) => (
                <li key={result.nombre} onClick={() => handleSearchResultClick(result.nombre)}>
                  {result.nombre}-Stock:{result.stock}
                </li>
              ))}
            </ul>
          )}
        </label>
     <div>
        <label className="px-4 form-label fs-5" htmlFor='cantidad'>Quantidade</label>
        </div>
        <label>
       
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className='rounded-pill px-4 py-2 text-xl w-100'/>
        </label>
       
           <div className='d-flex'>
        <button type="submit" className="btn btn-primary btn-lg mt-5">Add Medicine</button>
       </div>
       <br></br>
        <br></br>
       <div className='card-footer'>
       <div className='text-center justify-content-center mx-4 mb-3'>    
           <button className="btn  btn-danger btn-lg mt-3" onClick={handleGuardarSubmit}>Guardar</button>
        </div>
       </div>
      </form>
      </div>
      </div>
      </div>
      </div>
      <div className="mx-5"  style={{ flex: 1 }}>
      <MedicineTable medicines={medicines} onDelete={handleDeleteMedicine} />
    </div>
    </div>
   
  );
};

const MedicineTable = ({ medicines, onDelete })  => {
  return (
    <div>
     <div className='text-center mb-3 '>
      <h2>Saída Medicamentos</h2>
      
      </div>
     
      <table className="tableX table-striped table-hover text-sm text-left p-3 col-6">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
             <th scope="col" className="px-6 py-2">Medicamento</th>
          <th scope="col" className="px-6 py-2">Quantidade</th>
          <th scope="col" className="px-6 py-2">Acçoes</th>
         
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td className="px-6 py-2 fs-5">{medicine.nombre}</td>
              <td className="px-6 py-2 fs-5">{medicine.cantidad}</td>
              
              <td className='mb-4'><button
          className="btn btn-danger btn-sm mb-3"
          onClick={() => onDelete(index)}
        >
          Eliminar
        </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
   
  );
};

export default MedicineForm;
