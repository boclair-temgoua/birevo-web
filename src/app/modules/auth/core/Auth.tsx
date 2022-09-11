import {
  FC,
  useState,
  createContext,
  useContext,
  ReactNode,
} from 'react'
import { getCurrentUserFormToken } from '../../../utility'
import { useQuery } from '@tanstack/react-query';
import { getOneApi } from '../../user/api/index';


export interface OneUserContextProps {
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
  billing: {} | any | undefined;
  balance: {} | any | undefined;
  currency: {} | any | undefined;
  organization: {} | any | undefined;
  subscribeUser: {} | any | undefined;
  logout: () => void
}

const AuthUserContext = createContext<OneUserContextProps | null>(null)


const useAuth = () => {
  return useContext(AuthUserContext)
}

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState(getCurrentUserFormToken())

  const fetchOneUser = async () => await getOneApi({ user_uuid: auth?.uuid })
  const { data } = useQuery(['user'], () => fetchOneUser(), {
    refetchOnWindowFocus: false
    // staleTime: 60_000,
  })
  const user: any = data?.data

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
