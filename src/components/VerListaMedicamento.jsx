import React, { useState, useEffect, useCallback} from 'react';
import { useMedicamento} from '../context/MedicamentosContex';
import { format } from 'date-fns';
import '../styles/Modal.css';
import '../styles/TablaCentros.css';


const MedicamentosView = () => {
  const { getMedicamentos, editoMedicamento } = useMedicamento();
  const [medicamentos, setMedicamentos] = useState([]);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMedicamento, setEditMedicamento] = useState(null);
  const [orderField, setOrderField] = useState('nombre'); // Ordenar por defecto por nombre
  const [orderDirection, setOrderDirection] = useState('asc'); // Ordenar por defecto en orden ascendente


 
 

  const loadMedicamentos = useCallback(async () => {
    try {
      const data = await getMedicamentos();
     
      setMedicamentos(data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error loading medicamentos:', error);
    }
  },  [getMedicamentos]);
  useEffect(() => {
    // Load the medicamentos when the component mounts
    loadMedicamentos();
  }, [loadMedicamentos]);

  const openEditModal = (medicamento) => {
    setIsEditModalOpen(true);
    setEditMedicamento(medicamento);
  };

 const handleEditMedicamento = async () => {
     
      await editoMedicamento(editMedicamento);
        setIsEditModalOpen(false);
        loadMedicamentos();

 }

 const sortMedicamentos = () => {
  const sortedMedicamentos = [...medicamentos].sort((a, b) => {
    if (orderField === 'stock') {
      return orderDirection === 'asc' ? a.stock - b.stock : b.stock - a.stock;
    } else if (orderField === 'nombre') {
      return orderDirection === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    } else if (orderField === 'caducidad') {
      return orderDirection === 'asc'
        ? new Date(a.caducidad) - new Date(b.caducidad)
        : new Date(b.caducidad) - new Date(a.caducidad);
    }
    return 0;
  });

  return sortedMedicamentos;
};


return (
  <div>
    <div className="text-center text-primary fs-1">Stock Depósito</div>
    <div className="card shadow-2-strong">
      <div className="card-body">
        <div className="table-responsive pt-2">
          <div className='tableC'>
            <table className="table table-flush">
              <thead className="thead-light">
                <tr>
                  <th scope="col">
                    <button onClick={() => {
                      if (orderField === 'nombre') {
                        setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
                      }
                      setOrderField('nombre');
                    }}>
                      Nombre {orderField === 'nombre' && <span>{orderDirection === 'asc' ? '↑' : '↓'}</span>}
                    </button>
                  </th>
                  <th scope="col">
                    <button onClick={() => {
                      if (orderField === 'stock') {
                        setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
                      }
                      setOrderField('stock');
                    }}>
                      Stock {orderField === 'stock' && <span>{orderDirection === 'asc' ? '↑' : '↓'}</span>}
                    </button>
                  </th>
                  <th scope="col">
                    <button onClick={() => {
                      if (orderField === 'caducidad') {
                        setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
                      }
                      setOrderField('caducidad');
                    }}>
                      Caducidad {orderField === 'caducidad' && <span>{orderDirection === 'asc' ? '↑' : '↓'}</span>}
                    </button>
                  </th>
                  <th scope="col">Acçoes</th>
                </tr>
              </thead>
              <tbody>
                {sortMedicamentos().map((medicamento) => {
                  const isMedicamentoExpired = (caducidad) => {
                    const currentDate = new Date();
                    const threeMonthsLater = new Date();
                    threeMonthsLater.setMonth(currentDate.getMonth() + 3);
                    const caducidadDate = new Date(caducidad);
                    return caducidadDate < threeMonthsLater;
                  };

                  return (
                    <tr key={medicamento._id}>
                      <td>{medicamento.nombre}</td>
                      <td>{medicamento.stock}</td>
                      <td className={isMedicamentoExpired(medicamento.caducidad) ? 'expired-date' : ''}>
                        {format(new Date(medicamento.caducidad), 'MM/yyyy')}
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-sm text-center" onClick={() => openEditModal(medicamento)}>
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


{isEditModalOpen && (
  <div className="vista-container">
    <div className="modall-content">
      <h2>Editar Medicamento</h2>
      {editMedicamento && (
        <form className="edit-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="medicamentoNombre" className="text-bold fs-5">Nombre:</label>
              <div className="input-value">{editMedicamento.nombre}</div>
            </div>
            <div className="form-group">
              <label htmlFor="medicamentoCaducidad" className="text-bold fs-5">Caducidad:</label>
              <input
                type="date"
                id="medicamentoCaducidad"
                value={editMedicamento.caducidad}
                onChange={(e) =>
                  setEditMedicamento({
                    ...editMedicamento,
                    caducidad: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="medicamentoStock" className="text-bold fs-5">Stock:</label>
              <div className="input-value">{editMedicamento.stock}</div>
            </div>
          </div>
          <div className="button-group">
            <button className="btn btn-primary" type="button" onClick={handleEditMedicamento}>
              Guardar Cambios
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setIsEditModalOpen(false)}>
              Salir
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
)}

  </div>
  );
};

export default MedicamentosView;
