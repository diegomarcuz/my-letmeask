import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthProvider'

export function useAuth(){
  const value = useContext(AuthContext);
  return value;
}