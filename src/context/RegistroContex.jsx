import {createContext, useState, useContext, useEffect} from 'react'
import {registerRequest, loginRequest, verifyRequest} from '../api/auth.js'
import Cookies from  'js-cookie'




export const RegistroContext = createContext()

export const useRegistro = () => {
    const context = useContext(RegistroContext)
    if(!context){
        throw new Error('useRegistro debe estar dentro del proveedor RegistroContex')
    }
    return context
}

export const RegistroProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true); 
  

     // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

    const signUp = async (user) => {
      
        try {
            const res = await registerRequest(user);
            if (!res.data) return setIsAuth(false);
            if (res.status === 200) {
              setUser(res.data);
              setIsAuth(true);
              setLoading(false);
            }
          } catch (error) {
            if (error.response && error.response.data) {
              // Aquí puedes manejar el error y acceder a error.response.data si está presente
              console.error('Error response data:', error.response.data);
            } else {
              // Aquí puedes manejar otros tipos de errores
              console.error('Error:', error);
            }
          }
        };

   

        const signIn = async (user) => {
            try {
              const res = await loginRequest(user);
              console.log(res);
              setUser(res.data);
              Cookies.set("token", res.data.token)

              setIsAuth(true);
              setLoading(false);

            } catch (error) {
              console.log(error);
              // setErrors(error.response.data.message);
            }
          };

          const logout = () => {
            Cookies.remove("token");
            setUser(null);
            setIsAuth(false);
          };
        
          useEffect(() => {
            const checkUser = async () => {
              const cookies = Cookies.get("token");
              if (!cookies) {
                setIsAuth(false);
                setLoading(false);
                return;
              }

              try {
                const res = await verifyRequest(cookies);
                console.log(res);
                if (!res.data) return setIsAuth(false);
                setIsAuth(true);
                setUser(res.data);
                setLoading(false);
              } catch (error) {
                setIsAuth(false);
                setLoading(false);
              }
            };

        checkUser()
    }, [])

  

        return (
            <RegistroContext.Provider value={{signUp, signIn, user, isAuth, errors, logout, loading}}>
                {children}
            </RegistroContext.Provider>
        )

}