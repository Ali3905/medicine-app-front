import { Link } from 'react-router-dom'
import { useRegistro } from '../context/RegistroContex';
//import { ButtonLink } from './restos/ButtonLink';
import '../styles/Navbar.css';
import { useState } from 'react'; 




function Navbar() {
  const { isAuth, logout, user } = useRegistro();
  const [almacenOpen, setAlmacenOpen] = useState(false); // Estado para controlar si el menú de almacén está abierto
  const [farmaciaOpen, setFarmaciaOpen] = useState(false);
  const [privadoOpen, setPrivadoOpen] = useState(false);
  const [movimentosOpen, setMovimentos] = useState(false);

  const toggleAlmacenMenu = () => {
    setAlmacenOpen(!almacenOpen);
    setFarmaciaOpen(false);
    setPrivadoOpen(false);
    setMovimentos(false);
  };
  const toggleFarmaciaMenu = () => {
    setFarmaciaOpen(!farmaciaOpen);
    setAlmacenOpen(false);
    setPrivadoOpen(false);
    setMovimentos(false);
  };
  const togglePrivadoMenu = () => {
    setPrivadoOpen(!privadoOpen);
    setAlmacenOpen(false);
    setFarmaciaOpen(false);
    setMovimentos(false);
  };

  const toggleMovimentosMenu = () => {
    setMovimentos(!movimentosOpen);
    setAlmacenOpen(false);
    setFarmaciaOpen(false);
    setPrivadoOpen(false);
  };



  return (
    <aside className="container col-3">
      
        <ul className="content">
          
         {isAuth ? (
            <>        
              <li className='mb-4 fs-5'>
                <Link className="dropdown-item" to="/" onClick={() => logout()}>
                 <strong>Sair do programa</strong> 
                </Link>
              </li>         
                <h5>Benvind@: {user.nombre}</h5>
              
                {isAuth && user.rol === 'deposito' && (
            <>
             
              <li className="mb-3 fs-6"> {/* Agrega espacio a la derecha */}
                <Link className="" to="/">Home</Link>
              </li>
              <li>
              <Link className="dropdown-item" to="/listaMedicamentos">Stock</Link>
            </li>
              <li>
              <Link className="dropdown-item" to="/salidas">Salidas</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/entradas">Entradas</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/balanceteDep">Balancete</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/inventario">Inventario</Link>
            </li>
             
              </>
              )}
              {isAuth && user.rol === 'admin' && (
              <>
             
              <ul className='submenu'>
              <li className="nav-item me-2"> {/* Agrega espacio a la derecha */}
                <Link className="nav-link" to="/">Home</Link>
              </li>
              </ul>
              <li className={`nav-item mb-4 fs-5 ${movimentosOpen ? 'active' : ''}`}>
        <Link className="dropdown-item" to="#" onClick={toggleMovimentosMenu}>
          <strong>Movimentos</strong>
        </Link>
        {/* Enlaces dentro del menú Almacén */}
        {movimentosOpen && (
          <ul className="submenu">
             <li>
              <Link className="dropdown-item" to="/centros">Por centro</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/gasto">Totales Centro</Link>
            </li>
            
          </ul>
        )}
      </li>
          <li className={`nav-item mb-4 fs-5 ${almacenOpen ? 'active' : ''}`}>
        <Link className="dropdown-item" to="#" onClick={toggleAlmacenMenu}>
          <strong>Armazem</strong>
        </Link>
        {/* Enlaces dentro del menú Almacén */}
        {almacenOpen && (
          <ul className="submenu">
             <li>
              <Link className="dropdown-item" to="/listaMedicamentos">Stock</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/balanceteDep">Balancete</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/entradas">Entradas</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/salidas">Salidas</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/inventario">Inventario</Link>
            </li>
          </ul>
        )}
      </li>

      <li className={`nav-item mb-4 fs-5 ${farmaciaOpen ? 'active' : ''}`}>
        <Link className="dropdown-item" to="#" onClick={toggleFarmaciaMenu}>
          <strong>Farmacia</strong>
        </Link>
        {/* Enlaces dentro del menú Almacén */}
        {farmaciaOpen && (
          <ul className="submenu">
             <li>
              <Link className="dropdown-item" to="/dispensacionHdD">Saidas</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/inventarioHdd">Inventario</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/balanceteHDD">Balancete</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/stocKHDD">Stock</Link>
            </li>
          </ul>
        )}
      </li>
      <li className={`nav-item mb-4 fs-5 ${privadoOpen ? 'active' : ''}`}>
        <Link className="dropdown-item" to="#" onClick={togglePrivadoMenu}>
          <strong>Privado</strong>
        </Link>
        {/* Enlaces dentro del menú Almacén */}
      {privadoOpen && (
          <ul className="submenu">
            
            <li>
              <Link className="dropdown-item" to="/entradaPrivado">Entrada</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/salidaPrivado">Saidas</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/listaPrivado">Lista</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/balancetePriv">Balancete</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/inventarioPrivado">Inventario</Link>
            </li>
          </ul>
        )}
      </li>
      <ul>
      <li className="nav-item me-2"> {/* Agrega espacio a la derecha */}
          <Link className="nav-link" to="/registra">Registrar</Link>
        </li> 
        </ul>
              </>
              )}
                {isAuth && user.rol === 'farmacia' && (
              <>
              <li className="nav-item me-2"> {/* Agrega espacio a la derecha */}
                <Link className="nav-link" to="/dispensacionHdD">Saídas</Link>
              </li>
              <li>
              <Link className="dropdown-item" to="/stocKHDD">Stock</Link>
            </li>
              <li className="nav-item me-2"> {/* Agrega espacio a la derecha */}
                <Link className="nav-link" to="/gasto">Balancete</Link>
              </li>
              <li>
              <Link className="dropdown-item" to="/inventarioHdd">Inventario</Link>
            </li>
              </>
                )}
                </>
         
          ) : (
            <>
              <li className="nav-item me-2"> {/* Agrega espacio a la derecha */}
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              
            </>
          )}
        </ul> 
  </aside>
   
  
   
  )
}

export default Navbar