import { RegisterNewUserFromEvent, ValidateUserExists } from "@/DAO/users";
import { CreateUser, PasswordEyeIcon } from "@/public/svgs/Icons";
import React, { useEffect, useState } from "react";
import ProfileImageUpload from "../profileImageUpload";
import { addUserMailToEvent } from "@/DAO/event";
import { addMember } from "@/DAO/members";
import Swal from "sweetalert2";

export default function RegisterUserInEvent(props) {
  const [user, setUser] = useState({
    imageUrl: "",
    name: "",
    identification: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "",
    memberID: "",
    status: "",
    confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleRegistration = async () => {
    if (formValidation()) {
      if (user.userType.trim() === "Miembro") {
        await createMemberUser();
      } else {
        await createAdminRegisUser();
      }
      props.setUpdateMemberList(!props.updateMemberList);
    }
  };

  //create members
  const createMemberUser = async () => {
    const result = await addMember(user, props.eventId);
    if (result) {
      Toast.fire({
        icon: "success",
        title: `Miembro ingresado satisfactoriamente`,
      });
      handleCancelButton();
    }
  };

  //create Admins and Regis
  const createAdminRegisUser = async () => {
    const isNewUser = await ValidateUserExists(user.identification, user.email);
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
          await RegisterNewUserFromEvent(user, res.uid, props.eventId).then(
            () => {
              handleCancelButton();
            }
          );
        } else {
          Toast.fire({
            icon: "error",
            title: `Error al registrar en Auth`,
          });
        }
      });
    } else {
      await addUserMailToEvent(props.eventId, user.userType, user.email).then(
        () => {
          handleCancelButton();
          // Toast.fire({
          //   icon: "success",
          //   title: `Usuario registrado correctamente`,
          // });
        }
      );
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
    if (user.phoneNumber.trim() === "") {
      validationErrors.phoneNumber = "El teléfono es requerido";
    } else if (!isValidPhoneNumber(user.phoneNumber)) {
      validationErrors.phoneNumber = "El teléfono no es válido";
    }
    if (user.userType.trim() === "" || user.userType.trim() === "Seleccionar") {
      validationErrors.userType = "El tipo de usuario es requerido";
    }
    if (user.userType.trim() === "Miembro") {
      if (user.memberID.trim() === "") {
        validationErrors.memberID =
          "La identificación del miembro es requerida";
      }
      if (user.status.trim() === "" || user.status.trim() === "Seleccionar") {
        validationErrors.status = "El estatus es requerido";
      }
      if (
        user.confirmation.trim() === "" ||
        user.confirmation.trim() === "Seleccionar"
      ) {
        validationErrors.confirmation = "La confirmación es requerida";
      }
    } else {
      if (user.password.trim() === "") {
        validationErrors.password = "La contraseña es requerida";
      } else if (user.password.length < 8) {
        validationErrors.password =
          "La contraseña debe tener mínimo 8 caracteres";
      }
      if (user.confirmPassword.trim() === "") {
        validationErrors.confirmPassword =
          "Confirmar la contraseña es requerido";
      } else if (user.confirmPassword != user.password) {
        validationErrors.password = "La contraseñas no coinciden";
        validationErrors.confirmPassword = "La contraseñas no coinciden";
      }
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

  const [showMemberData, setShowMemberData] = useState(false);
  useEffect(() => {
    if (user.userType == "Miembro") setShowMemberData(true);
    else setShowMemberData(false);
  }, [user.userType]);

  return (
    <>
      <div className="relative z-[52]">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-start">
                  <CreateUser />
                  <h1 className="text-[18px] sm:text-[24px] ml-0 sm:ml-2 font-bold text-black">
                    Crear nuevo usuario
                  </h1>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-3 w-full px-4 sm:px-10">
                <div className="w-min sm:col-span-3">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] mt-3">
                    Foto de perfil
                  </label>
                  <ProfileImageUpload
                    profilePicture
                    containerClassName={
                      "flex justify-center items-center h-24 md:h-44 w-24 md:w-44 bg-[#F3F4F5] rounded-full cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-200 border border-[#8B9592]"
                    }
                    setEvent={setUser}
                    event={user}
                    imageUrl={user.imageUrl}
                  />
                </div>
                <div className="relative">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                    Nombre completo
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
                <div className="relative">
                  <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                    Tipo de usuario
                  </label>
                  <select
                    name="userType"
                    id="userType"
                    className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                      errors.userType ? "border-red-500" : "border-[#AAB4C1]"
                    }`}
                    value={user.userType}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Registrador">Registrador</option>
                    <option value="Miembro">Miembro</option>
                  </select>
                  {errors.userType && (
                    <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                      {errors.userType}
                    </p>
                  )}
                </div>
                {/* Solo si usuario es miembro */}
                {showMemberData && (
                  <>
                    <div className="relative">
                      <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                        Identificador del miembro
                      </label>
                      <input
                        className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                          errors.memberID
                            ? "border-red-500"
                            : "border-[#AAB4C1]"
                        }`}
                        name="memberID"
                        value={user.memberID}
                        onChange={handleInputChange}
                      />
                      {errors.memberID && (
                        <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                          {errors.memberID}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                        Estatus
                      </label>
                      <select
                        name="status"
                        id="status"
                        className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                          errors.status ? "border-red-500" : "border-[#AAB4C1]"
                        }`}
                        value={user.status}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                      {errors.status && (
                        <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                          {errors.status}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                        Confirmación
                      </label>
                      <select
                        name="confirmation"
                        id="confirmation"
                        className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                          errors.confirmation
                            ? "border-red-500"
                            : "border-[#AAB4C1]"
                        }`}
                        value={user.confirmation}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="no">No confirmado</option>
                      </select>
                      {errors.confirmation && (
                        <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                          {errors.confirmation}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Solo si usuario NO es miembro */}
                {!showMemberData && (
                  <>
                    <div className="relative">
                      <label className="font-bold text-[12px] tracking-normal text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 ">
                        Contraseña
                      </label>
                      <input
                        className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                          errors.password
                            ? "border-red-500"
                            : "border-[#AAB4C1]"
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
                        Confirmar contraseña
                      </label>
                      <input
                        className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-[#AAB4C1]"
                        }`}
                        name="confirmPassword"
                        value={user.confirmPassword}
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={handleInputChange}
                      />
                      <div
                        className={`bottom-[15px] right-[12px] absolute hover:cursor-pointer ${
                          showConfirmPassword
                            ? "fill-[#bfc2c4]"
                            : "fill-[#899592]"
                        } `}
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        <PasswordEyeIcon />
                      </div>
                      {errors.confirmPassword && (
                        <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-5">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
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
