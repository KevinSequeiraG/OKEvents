import { UserAuthContextProvider } from '@/BAO/userAuthContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>)
}
