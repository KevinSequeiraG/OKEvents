import { useUserAuth } from "@/BAO/userAuthContext";
import { AlertCircleIcon } from "@/public/svgs/Icons";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ForgotPassword(props) {
  const { changePassword } = useUserAuth();
  const [userEmail, setUserEmail] = useState("");

  //success or error notifications on top
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const sendChangePasswordEmail = async () => {
    try {
      await changePassword(userEmail);
      Toast.fire({
        icon: "success",
        title: `Correo enviado, revisa la casilla de spam`,
      });
      setUserEmail("");
      props.setForgotPassword(false);
    } catch (error) {
      console.log("Error al cambiar contraseña", error.message);
      Toast.fire({
        icon: "error",
        title: `El correo ingresado no existe en la base de datos`,
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#707070] bg-opacity-[0.35] transition-opacity"></div>
      <div
        className={`h-3/6 lg:h-min flex flex-col bg-white w-full lg:w-3/12 absolute bottom-0 lg:bottom-1/3 lg:mx-auto lg:left-0 lg:right-0 p-5 mt-8 lg:mt-0 rounded-t-[20px] lg:rounded-[20px] shadow-lg font-Inter`}
      >
        <button
          onClick={() => props.setForgotPasswordModal(false)}
          className="text-[2rem] absolute right-4 top-0"
        >
          ×
        </button>
        <h1 className="text-[1.2rem] text-center font-medium">
          Recuperar contraseña
        </h1>
        <p className="text-[16px] text-[#706f6f] mt-4 mb-2">
          Ingrese su email, le llegará un correo de recuperación.
        </p>
        <h4 className="text-[12px] font-bold">Correo electrónico</h4>
        <input
          className="mt-1 border rounded-lg border-black w-full px-3 py-2"
          placeholder="ejemplo@empresa.com"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        {/* red alert */}
        <div className="bg-red-100 text-red-500 py-1 my-3 rounded-lg px-3 w-fit mx-auto">
          <p className="flex flex-row text-[12px] items-center">
            <AlertCircleIcon />
            Revisa la casilla de Spam si no recibes el email
          </p>
        </div>
        <button
          onClick={() => {
            sendChangePasswordEmail();
          }}
          className="bg-[#426CB4] mt-1 text-white rounded-lg py-1 w-full font-medium text-[16px]"
        >
          Enviar
        </button>
      </div>
    </>
  );
}
