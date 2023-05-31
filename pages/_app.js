import { UserAuthContextProvider } from '@/BAO/userAuthContext'
import Navbar from '@/UI-Components/layout/navbar'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </UserAuthContextProvider>)
}
