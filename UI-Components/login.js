// import { useUserAuth } from "../BAO/userAuthContext";

const Login = () => {
  // const { logIn } = useUserAuth();

  return (
    <div className="h-screen md:flex items-center justify-center bg-gray-100">
      <img src='/Images/logo1.png' />
      <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">

        <h2 className="text-3xl text-gray-400 mb-3 text-center">Inicio de sesión</h2>

        <div className="mb-2">
          <label className="text-sm">Correo electrónico</label>
          <input type="text" placeholder="Correo electrónico" className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none text-gray-400" />
        </div>

        <div className="mt-2 mb-3">
          <label className="text-sm">Contraseña</label>
          <input type="password" placeholder="Contraseña" className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none text-gray-400" />
        </div>

        <button
          className="border-none bg-blue-800 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5"
          type="submit"
        >
          Iniciar sesión
        </button>

        <a href="#" className="text-sm text-blue-400">Olvidé mi contraseña</a>

      </div>
    </div>
  )
}

export default Login;