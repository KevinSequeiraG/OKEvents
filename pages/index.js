import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from '@/UI-Components/login'
import { UserAuthContextProvider } from '@/BAO/userAuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <UserAuthContextProvider>
      <Login />
    </UserAuthContextProvider>
  )
}
