import { RegisterNewUserFromLoginPage, ValidateUserExists } from "@/DAO/users";
import { CreateUser, PasswordEyeIcon } from "@/public/svgs/Icons";
import React, { useState } from "react";

export default function RegisterUser(props) {
  const [user, setUser] = useState({
    name: "",
    identification: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async () => {
    // Acá va la lógica para registrar al usuario
    if (formValidation()) {
      const isNewUser = await ValidateUserExists(
        user.identification,
        user.email
      );
      if (isNewUser) {
        await fetch("/api/createUser", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email.trim().toLowerCase(),
            userPassword: user.password,
          }),
        }).then(async (res) => {
          if (res.status === 200) {
            res = await res.json();
            await RegisterNewUserFromLoginPage(user, res.uid).then(() => {
              handleCancelButton();
            });
          } else {
            console.log(res);
            Toast.fire({
              icon: "error",
              title: `Error al registrar en Auth`,
            });
          }
        });
      }
    }
  };

  const formValidation = () => {
    const validationErrors = {};
    setErrors({});
    if (user.name.trim() === "") {
      validationErrors.name = "El nombre es requerido";
    }
    if (user.identification.trim() === "") {
      validationErrors.identification = "La identificación es requerida";
    }
    if (user.email.trim() === "") {
      validationErrors.email = "El correo electrónico es requerido";
    } else if (!isValidEmail(user.email)) {
      validationErrors.email = "El correo electrónico no es válido";
    }
    if (user.password.trim() === "") {
      validationErrors.password = "La contraseña es requerida";
    } else if (user.password.length < 8) {
      validationErrors.password =
        "La contraseña debe tener mínimo 8 caracteres";
    }
    if (user.phoneNumber.trim() === "") {
      validationErrors.phoneNumber = "El teléfono es requerido";
    } else if (!isValidPhoneNumber(user.phoneNumber)) {
      validationErrors.phoneNumber = "El teléfono no es válido";
    }
    // Si hay errores retorna false, sino retorna true
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  // Lógica de validación de correo electrónico
  const isValidEmail = (email) => {
    const re =
      /^([a-zA-Z0-9-_]+([.][a-zA-Z0-9-_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5})$/;
    return re.exec(email.trim().toLocaleLowerCase());
  };

  // Lógica de validación del número de teléfono
  const isValidPhoneNumber = (phoneNumber) => {
    const numberVal = /^[0-9\-]+$/;
    return phoneNumber.match(numberVal) && phoneNumber.length > 7;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const handleCancelButton = () => {
    props.setRegisterUserModal(false);
  };

  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-center">
                  <CreateUser />
                  <h1 className="text-[18px] sm:text-[24px] ml-0 sm:ml-2 font-bold text-black">
                    Crear nuevo usuario
                  </h1>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-2 w-full px-4 sm:px-0 sm:w-3/4 mx-auto">
                <div className="relative">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                    Nombre
                  </label>
                  <input
                    className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                      errors.name ? "border-red-500" : "border-[#AAB4C1]"
                    }`}
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                    Identificación
                  </label>
                  <input
                    className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                      errors.identification
                        ? "border-red-500"
                        : "border-[#AAB4C1]"
                    }`}
                    name="identification"
                    value={user.identification}
                    onChange={handleInputChange}
                  />
                  {errors.identification && (
                    <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                      {errors.identification}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                    Correo electrónico
                  </label>
                  <input
                    className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                      errors.email ? "border-red-500" : "border-[#AAB4C1]"
                    }`}
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                    Contraseña
                  </label>
                  <input
                    className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                      errors.password ? "border-red-500" : "border-[#AAB4C1]"
                    }`}
                    name="password"
                    value={user.password}
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputChange}
                  />
                  <div
                    className={`bottom-[15px] right-[12px] absolute hover:cursor-pointer ${
                      showPassword ? "fill-[#bfc2c4]" : "fill-[#899592]"
                    } `}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <PasswordEyeIcon />
                  </div>
                  {errors.password && (
                    <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                    Teléfono
                  </label>
                  <input
                    className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                      errors.phoneNumber ? "border-red-500" : "border-[#AAB4C1]"
                    }`}
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {errors.phoneNumber && (
                    <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-5">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                  onClick={handleRegistration}
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={handleCancelButton}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
