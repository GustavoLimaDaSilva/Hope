import { useEffect} from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router"
import { useUserContext } from "./RouterProvider"

export default function App() {

   const context = useUserContext()
    if (!context) {
        return
    }

    const { user, setUser } = context

  const navigate = useNavigate()

  useEffect(() => {

    user ? navigate('/') : navigate('/login')

  }, [user])

  return (
    <div>
        <Outlet />
    </div>
  )
}

