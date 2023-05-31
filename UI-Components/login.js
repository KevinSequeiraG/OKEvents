import { useRouter } from "next/router";
import { useUserAuth } from "../BAO/userAuthContext";

const Login = () => {
    const { logIn } = useUserAuth();
    const router = useRouter()
    
    const handleLogIn = () => {
        // Acá va la lógica para loggear al usuario
        router.push("/home")
    }

    return (
        <div className="h-screen lg:flex items-center justify-center bg-gray-100">
            <img src="/Images/logo1.png" />
            <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">

                <h2 className="text-3xl text-gray-400 mb-3">Login</h2>

                <div className="mb-2">
                    <label className="text-sm">Name</label>
                    <input type="text" placeholder="Name" className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none" />
                </div>

                <div className="mt-2 mb-3">
                    <label className="text-sm">Password</label>
                    <input type="password" placeholder="Password" className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none" />
                </div>

                <button
                onClick={()=>handleLogIn()}
                    className="border-none bg-blue-800 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5"
                    type="submit"
                >
                    Sign In
                </button>

                <a href="#" className="text-sm text-blue-400">Forgot my Password</a>

            </div>

        </div>
    )
}

export default Login;