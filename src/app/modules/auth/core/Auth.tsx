import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserFormToken } from '../../../utility'
import { loadShowUser } from '../../../redux/actions/userAction'


interface AuthUserContextProps {
  id: string;
  uuid: string;
  email: string;
  dateExpired: Date;
  isConfirmEmail: boolean;
  isValidSubscribeUser: boolean;
  notificationTotal: number;
  organizationTotal: number;
  projectTotal: number;
  profile: {} | any | undefined;
  organization: {} | any | undefined;
  subscribeUser: {} | any | undefined;
  logout: () => void
}

const AuthUserContext = createContext<AuthUserContextProps | null>(null)


const useAuth = () => {
  return useContext(AuthUserContext)
}

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState(getCurrentUserFormToken())
  const user = useSelector((state: any) => state?.users?.user)
  const dispatch = useDispatch<any>()


  useEffect(() => {
    const loadItems = async () => {
      await dispatch(loadShowUser({ user_uuid: auth?.uuid }))
    }
    loadItems()
  }, [auth?.uuid])

  const logout = () => {
    // saveAuth(undefined)
    // setCurrentUser(undefined)
  }

  return (
    <AuthUserContext.Provider value={{ auth, ...user, logout }}>
      {children}
    </AuthUserContext.Provider>
  )
}
export { AuthProvider, useAuth }
