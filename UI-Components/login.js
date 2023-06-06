import { useRouter } from "next/router";
import { useUserAuth } from "../BAO/userAuthContext";
import { useEffect, useState } from "react";
import { PasswordEyeIcon } from "@/public/svgs/Icons";
import ForgotPassword from "./layout/modals/login/forgotPassword";
import RegisterUser from "./layout/modals/login/registerUser";

const Login = () => {
  const { logIn, logOut } = useUserAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [registerUserModal, setRegisterUserModal] = useState(false);

  const handleLogIn = async () => {
    // Acá va la lógica para loggear al usuario
    setLoginError(false);
    await logIn(userEmail, userPassword)
      .then(async (userCredential) => {
        if (rememberMeChecked) {
          localStorage.setItem("rememberMe", JSON.stringify(rememberMeChecked));
          localStorage.setItem("rememberMeEmail", JSON.stringify(userEmail));
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("rememberMeEmail");
        }
        router.push("/home");
      })
      .catch((error) => {
        console.log("Error de login", error);
        setLoginError(true);
      });
  };


  useEffect(() => {
    setRememberMeChecked(JSON.parse(localStorage.getItem("rememberMe")));
    setUserEmail(JSON.parse(localStorage.getItem("rememberMeEmail")));
    logOut();
  }, []);

  return (
    <div className="h-screen lg:flex items-center justify-center bg-gray-100 font-Inter">
      <img src="/Images/logo1.png" />
      <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg mx-5 lg:mx-0">
        <h2 className="text-3xl text-gray-400 mb-4 text-center">
          Inicio de sesión
        </h2>

        <div className="mb-2">
          <label className="text-sm font-medium">Usuario</label>
          <input
            type="text"
            placeholder="ejemplo@empresa.com"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            className={`w-full text-gray-700 px-2 py-1 mt-1 bg-gray-100 rounded-md focus:outline-none border focus:border-blue-300 ${loginError && "border-[#e098a4]"
            }`}
          />
        </div>

        <div className="mt-4 mb-4 font-medium relative">
          <label className="text-sm">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            onChange={(event) => setUserPassword(event.target.value)}
            className={`w-full text-gray-700 px-2 py-1 mt-1 bg-gray-100 rounded-md focus:outline-none border focus:border-blue-300 ${loginError && "border-[#e098a4]"
              }`}
          />
          <div
            className={`bottom-[9px] right-[12px] absolute hover:cursor-pointer ${showPassword ? "fill-[#bfc2c4]" : "fill-[#899592]"
              } `}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <PasswordEyeIcon />
          </div>
          {loginError && (
            <p className="absolute text-xs -bottom-5 text-red-500 font-medium w-full text-center">
              Credenciales incorrectas
            </p>
          )}
        </div>
        <button
          onClick={() => handleLogIn()}
          className="border-none bg-blue-800 py-1.5 text-white w-full my-2 rounded-xl hover:bg-blue-700 text-[14px]"
          type="submit"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setRegisterUserModal(true)}
          className="border-none bg-blue-800 py-1.5 text-white w-full mb-3 rounded-xl hover:bg-blue-700 text-[14px]"
          type="submit"
        >
          Registrarme
        </button>

        <div className="flex justify-between text-xs text-gray-500 font-medium mt-1.5">
          <div className="flex">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-[#AAB4C1] rounded-[5px]   checked:bg-blue-800 checked:border-blue-600 focus:outline-none mr-1 cursor-pointer"
              type="checkbox"
              id="flexCheckDefault"
              checked={rememberMeChecked}
              onChange={() => setRememberMeChecked(!rememberMeChecked)}
            />
            <label className="leading-4 " htmlFor="flexCheckDefault">
              Recuérdame
            </label>
          </div>
          <label
            onClick={() => setForgotPasswordModal(true)}
            className="cursor-pointer"
          >
            Olvidé mi contraseña
          </label>
          {/* <button className="bg-black text-white px-4 py-2" onClick={LoginWithGoogle}>google</button> */}
        </div>
      </div>
      {forgotPasswordModal && (
        <ForgotPassword setForgotPasswordModal={setForgotPasswordModal} />
      )}

     {registerUserModal && (
        <RegisterUser setRegisterUserModal={setRegisterUserModal} />
      )}
    </div>
  );
};

export default Login;
