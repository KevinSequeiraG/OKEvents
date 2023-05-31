import { Inter } from 'next/font/google'
import Login from '@/UI-Components/login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Login />
  )
}
