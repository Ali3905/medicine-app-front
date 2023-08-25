import { useForm } from 'react-hook-form';
import { useMedicamento } from '../context/MedicamentosContex';
import { useNavigate } from 'react-router-dom';

function NewMedicamento() {
    
    const {register,reset, handleSubmit} = useForm();
    const {nuevoFarmaco} = useMedicamento()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (values) => {
        await nuevoFarmaco(values)
        reset()
    })

    const handleSairClick = () => {
      // Navegar a la página "/home"
      navigate('/');
    };

      
       
   
  return (
    <div>
        <div className="card text-black border-radius: 25px;">
        <div className="card-body p-md-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Medicamento</p>
             
              <button className="button btn-secondary btn-lg" onClick={handleSairClick}>Sair</button>

       
              <form className="mx-1 mx-md-4" onSubmit={onSubmit}>
              <div>
              <label className="px-4 form-label fs-5" htmlFor='name'>Nome</label>
              </div>    
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input 
                    type='text'
                    {...register('nombre', {required: true})}
                      id='name'
                    className='rounded-pill px-4 py-2 text-xl w-80'
                    />

                  </div>
                </div>
                <div>
          <label className="px-4 form-label fs-5" htmlFor='email'>Descripçao</label>
          </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                  <input
                  type='text'
                    {...register('descripcion', {required: false})}
                      id='descripcion'
                   className='rounded-pill px-4 py-2 text-xl w-80'
                    />
                     
                  </div>
                </div>
                <div>
                <label className="px-4 form-label fs-5" htmlFor='centro'>Categoria</label>
                  </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
  <select
    {...register('categoria', { required: true })}
    id="centr"
    className="rounded-pill px-4 py-2 text-xl w-80"
  >
    <option value="">Selecciona un categoria</option>
    <option value="tarv">TARV</option>
    <option value="tio">TIO</option>
    <option value="pntcl">PNTCL</option>
    
  </select>
</div>

                </div>

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
                </div>

              </form>

            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewMedicamento