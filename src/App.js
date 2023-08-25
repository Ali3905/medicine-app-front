import { HomeAdmin, Registro, Login, SalidaM, EntradasM, Centros, AñadirMedicamento,
  DispenHdD, Medicamentos, Gasto, Inventario, BalanceteHdd, InventarioHdD, ListaPriv, 
  SalidaPriv, EntradaPriv, InventarioPriv, BalanceteDep, BalancetePriv, StockHdd } from './pages';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RegistroProvider } from './context/RegistroContex';
import RutasProtegidas from './RutasProtegidas';
import { CentrosProvider } from './context/CentrosContex';
import { MedicamentoProvider } from './context/MedicamentosContex';
import { MovimientoProvider } from './context/MovimientosContex';
import './index.css';
import Layout from './components/Layout';

function App() {
  return (
    <RegistroProvider>
      <CentrosProvider>
        <MedicamentoProvider>
          <MovimientoProvider>
            <BrowserRouter>
             <Layout>
              <Routes>
                <Route path='*' element={<h1>Not Found 404</h1>} />
                <Route path='/login' element={<Login />} />
                <Route path='/registra' element={<Registro />} />
                <Route path='/logout' />
                <Route path="/" element={<HomeAdmin />} />
                <Route element={<RutasProtegidas />}>             
                  <Route path="/salidas" element={<SalidaM />} />
                  <Route path="/gasto" element={<Gasto />} />
                  <Route path="/centros" element={<Centros />} />
                  <Route path="/inventario" element={<Inventario />} />
                  <Route path="/nuevoMedicamento" element={<AñadirMedicamento />} />
                  <Route path="/listaMedicamentos" element={<Medicamentos />} />
                  <Route path="/balanceteDep" element={<BalanceteDep />} />
                  <Route path="/entradas" element={<EntradasM />} />
                  <Route path="/entradaPrivado" element={<EntradaPriv />} />
                  <Route path="/listaPrivado" element={<ListaPriv />} />
                  <Route path="/salidaPrivado" element={<SalidaPriv />} />
                  <Route path="/balancetePriv" element={<BalancetePriv />} />
                  <Route path="/inventarioPrivado" element={<InventarioPriv />} />
                  <Route path="/dispensacionHdD" element={<DispenHdD />} />
                  <Route path="/stockHDD" element={<StockHdd />} />
                  <Route path="/balanceteHDD" element={<BalanceteHdd />} />
                  <Route path="/inventarioHdD" element={<InventarioHdD />} />
                </Route>
              </Routes>
              </Layout>
            </BrowserRouter> 
          </MovimientoProvider>
        </MedicamentoProvider>
      </CentrosProvider>
    </RegistroProvider>
  );
}

export default App;