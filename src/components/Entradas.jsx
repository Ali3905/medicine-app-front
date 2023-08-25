import React, { useState } from 'react';
import { buscarMedicamentos } from '../api/medicamentos';
import { useMovimiento } from '../context/MovimientosContex';

const EntradasForm = () => {
  const [medicines, setMedicines] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [caducidad, setCaducidad] = useState('');


  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const { nuevaEntrada } = useMovimiento();
  const handleSearch = async (nombre) => {
    console.log('nombre:', nombre)
    try {
      const response = await buscarMedicamentos(nombre); // Pass the nombre directly as a string
      setSearchResults(response.data);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleEntrarSubmit = async (e) => {
    e.preventDefault();
   
    // Validations can be added here, e.g., check if fields are empty
    const newMovimiento = {
        
        medicamentos: medicines,
      };
 
    console.log('newMovimiento:', newMovimiento);
  
    try {
      const result = await nuevaEntrada(newMovimiento);
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
        caducidad,
      };
      

    setMedicines([...medicines, newMedicine]);
  
    console.log('Medicamento añadido:');
    console.log(newMedicine);

    // Reset form fields after saving
    setNombre('');
    setCantidad('');
    setCaducidad('');
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
    <div>
      <div className="d-flex">
        
      <div className='flex'>
        <div className='card text-black border-radius: 25px;'>
        <div className='card-head p-md-5'>
        <div className='text-center mb-lg-4'>
      <h4>Añadir Medicamento</h4>
      </div>
      </div>
      <div className='card-body'>
      <form className='mx-5' onSubmit={handleTableSubmit}>
     
 
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
                <li key={result._id} onClick={() => handleSearchResultClick(result.nombre)}>
                  {result.nombre}
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
        <div>
        <label className="px-4 form-label fs-5" htmlFor='caducidad'>Caducidade</label>
        </div>
        <label>
        
          <input type="date" value={caducidad} onChange={(e) => setCaducidad(e.target.value)} className='rounded-pill px-4 py-2 text-xl w-100' />
        </label>
      
        <div className='d-flex'>
        <button type="submit" className="btn btn-primary btn-lg mt-5">Add Medicine</button>
       </div>
       <div className='card-footer'>
       <div className='text-center justify-content-center mx-4 mb-3 mb-lg-4'>
        <button className="btn  btn-danger btn-lg mt-5" onClick={handleEntrarSubmit}>Guardar</button>
        </div>
        </div>
      </form>
      </div>
      </div>
      </div>
      <div className="mx-4"  style={{ flex: 1 }}>
      <MedicineTables medicines={medicines} onDelete={handleDeleteMedicine} />
    </div>
    </div>
    </div>
  );
};

const MedicineTables = ({ medicines, onDelete }) => {
  return (
    <div>
     <div className='text-center mb-3 '>
      <h2>Entrada de Medicamentos</h2>
      
      </div>
      <table className=" table table-striped table-hover text-sm text-left p-3">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
             <th scope="col" className="px-6 py-2">Medicamento</th>
          <th scope="col" className="px-6 py-2">Quantidade</th>
          <th scope="col" className="px-6 py-2">Caducidade</th>
          <th scope="col" className="px-6 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td className="px-6 py-2 fs-5">{medicine.nombre}</td>
              <td className="px-6 py-2 fs-5">{medicine.cantidad}</td>
              <td className="px-6 py-2 fs-5">{medicine.caducidad}</td>
              <td className='mb-4'><button
          className="btn btn-danger btn-sm mb-3"
          onClick={() => onDelete(index)}>
          Eliminar
        </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntradasForm;
