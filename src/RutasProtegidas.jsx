import {Navigate, Outlet} from 'react-router-dom'
import { useRegistro } from './context/RegistroContex'

function RutasProtegidas() {
   const { isAuth } = useRegistro()

    if(!isAuth)
        return <Navigate to='/login' replace />

  return (
    <Outlet />
  )
}

export default RutasProtegidas