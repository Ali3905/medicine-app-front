import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás usando React Router

const Buttons = () => {
  return (
    <div className='row'>
      <div className='col-3 mx-2'>
      <Link to="/nuevoMedicamento">
        <button type="button" className="btn btn-light">Add Medicamento</button>
      </Link>
    </div>
    <div className='col-3'>
      <Link to="/listaMedicamentos">
        <button type="button" className="btn btn-light">Listado</button>
      </Link>
    </div>
    <div className='col-3'>
      <Link to="/entradas">
        <button type="button" className="btn btn-light">Entradas</button>
      </Link>
    </div>
    <div className='col-3'>
      <Link to="/dispensacionHdD">
        <button type="button" className="btn btn-light">Dispensacion HdD</button>
      </Link>
    </div>
      {/* Agrega más botones aquí */}
    </div>
  );
};

export default Buttons;
