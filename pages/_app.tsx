import type { AppProps } from 'next/app'
import {globalStyles} from '../stitches.config'
import { AuthProvider } from '../contexts/AuthProvider'



import '../service/firebase'
function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp
