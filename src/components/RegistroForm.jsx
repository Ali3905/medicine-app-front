import  { useForm } from 'react-hook-form';
import { useRegistro } from '../context/RegistroContex';


function RegistroForm() {

   
    const {register, handleSubmit} = useForm();
    const {signUp} = useRegistro()
 

  

const onSubmit = handleSubmit(async (values) => {
    await signUp(values)

})
 

  return (
    <div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between mt-5 py-4 px-4 px-xl-5">

      <div className="max-w-md mx-auto p-2 rounded-md justify-center items-center">
    <p className="fs-1 text-center my-5 py-5 contabilidad-title">Farmacia Hospital Carmelo</p>
  </div>
  <section className="vh-100">
    <div className="container-fluid h-custom">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-9 col-lg-6 col-xl-5">
   
      <form onSubmit={onSubmit}>
      <div className="form-outline mb-4">
              <div>
              <label className="form-label fs-5" htmlFor="form3Example3">Nome</label>
              </div>
              <input  
               type='text'
                {...register('nombre', {required: true})}
                id='form3Example3'
                className='rounded-pill px-4 py-2 text-xl w-80'
                />
            </div>
            <div>
            <label className="form-label fs-5" htmlFor="password">palavra-passe</label>
              </div>
            <div className="form-outline mb-3">
              <input type="password" 
              {...register('password', {required: true})}
              id="pasword"
              name='password'
              className='rounded-pill rounded-md px-4 py-2 my-2 text-xl w-70'
              />
            </div>
      
            <div>
            <label className="form-label fs-5" htmlFor="rol">puesto</label>
              </div>
            <div className="form-outline mb-3">
              <input type="text" 
              {...register('rol', {required: true})}
              id="rol"
              className='rounded-pill rounded-md px-4 py-2 my-2 text-xl w-70'
              />
            </div>
      
        <button className="btn btn-primary btn-lg" type="submit">salvar</button>
      </form>
   
   
          </div>
        </div>
      </div>
 
  </section>
</div>
</div>



  );
};

export default RegistroForm;
