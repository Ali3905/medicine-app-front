import { useRegistro } from '../context/RegistroContex';
import pizarra from "../images/pizarra.svg";
import { Navigate } from 'react-router-dom';
import bote from "../images/bote.svg";
import capsula from "../images/capsula.svg";


const Home = () => {
  const { isAuth, user } = useRegistro();
  
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container d-flex">
      {isAuth ? (
            <>
                   {isAuth && user.rol === 'admin' && (
            <>
             <div className='row'>
        <div className="col-4 my-5">
          <div className="fs-1 mt-4">Farmacia Hospital Carmelo</div>
          <div className="fs-2 mt-4">Bom trabalho!</div>
        </div>
      <div className="image-container col-md-4">
      <img src={pizarra} alt="Icon" />
      </div>
      </div>
      
      
      </>
              )}
              {isAuth && user.rol === 'deposito' && (
              <>
       <div className='row'>
        <div className="col-md-4 my-5">
          <div className="fs-2 mt-4">Farmacia Hospital Carmelo</div>
          <div className="fs-3 mt-4">Bom trabalho!</div>
        </div>
      <div className="image-container col-4">
      <img src={capsula} alt="Icon" />
      </div>
      </div>
     
      </>
      )}
       {isAuth && user.rol === 'farmacia' && (
       <>
      <div className='row'>
        <div className="col-4 my-5">
          <div className="fs-2 mt-4"><strong>Farmacia Hospital Carmelo</strong></div>
          <div className="fs-3 mt-4"><strong>Bom trabalho!</strong></div>
        </div>
      <div className="image-container col-4">
      <img src={bote} alt="Icon" />
      </div>
      </div>
      
      </>
      )}
      </>
         
          ) : (
            <>
         
     
      </>
          )}
    </div>
  );
};

export default Home;
