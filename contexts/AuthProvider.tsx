import { createContext, ReactNode, useState, useEffect } from 'react'
import { firebase } from '../service/firebase'


type User = {
  id: string;
  name: string;
  photoURL: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContext ={
  user: User | undefined;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<User>()
  

   useEffect(()=>{
    const unsubscribeUserStateObserver = firebase
      .auth()
      .onAuthStateChanged(user => {
          if(user){
            const {uid, displayName, photoURL } =  user;
            
            if( !displayName || !photoURL){
              throw new Error("Missing information from Google Account")
            }
      
            setUser({
              id: uid,
              name: displayName,
              photoURL: photoURL
      
      
            })
          }
      })
      
      return ()=>{
        unsubscribeUserStateObserver()
      }
   }, [])
  
  async function signIn(){

    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth()
    
    const userCredentials = await auth.signInWithPopup(provider)
    
    if(userCredentials.user){
      const {uid, displayName, photoURL } =  userCredentials.user;
      
      if( !displayName || !photoURL){
        throw new Error("Missing information from Google Account")
      }

      setUser({
        id: uid,
        name: displayName,
        photoURL: photoURL


      })
    }
  
    
  }

  return (
    <AuthContext.Provider value={{user, signIn}}>
      {children}
    </AuthContext.Provider>
  )


}