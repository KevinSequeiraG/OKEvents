/* eslint-disable @next/next/no-img-element */
import { UpdatePresentState, getMemberById } from "@/DAO/members";
import ViewMember from "@/UI-Components/modal/viewMember";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const GuestUserCard = (props) => {
  const [showViewMember, setShowViewMember] = useState(false);
  const [userData, setUserData] = useState(props.user);

  useEffect(() => {
    setUserData(props.user);
  }, [props.user]);

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

  return (
    <div className="flex flex-row justify-between mb-5 items-center w-[50%] mx-auto border px-5 py-3 rounded-xl">
      <div className="flex flex-row items-center">
      {userData.imageUrl ? <img
          className="inline-block h-9 w-9 sm:h-12 sm:w-12 rounded-full cursor-pointer !object-cover"
          src={userData.imageUrl}
          alt="Foto de perfil"
        />:
        <svg
          className="inline-block h-9 w-9 sm:h-12 sm:w-12 rounded-full cursor-pointer !object-cover bg-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="24"
          viewBox="0 0 21 24"
        >
          <path
            id="Icon_awesome-user"
            data-name="Icon awesome-user"
            d="M10.5,12a6,6,0,1,0-6-6A6,6,0,0,0,10.5,12Zm4.2,1.5h-.783a8.16,8.16,0,0,1-6.834,0H6.3A6.3,6.3,0,0,0,0,19.8v1.95A2.251,2.251,0,0,0,2.25,24h16.5A2.251,2.251,0,0,0,21,21.75V19.8A6.3,6.3,0,0,0,14.7,13.5Z"
            fill="#fff"
          />
        </svg>}
        <div className="ml-3">
          <div className="font-bold  flex items-center">
            <p className="text-[13px] truncate mr-1">
              {userData.name.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
                letra.toUpperCase()
              )}
            </p>
          </div>
          {userData.identification ? (
            <p className="text-[10px] text-[#899592]">Ced: {userData.identification}</p>
          ) : (
            null
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div className="mx-2 px-4 py-2 bg-green-400 rounded-xl text-gray-100">{userData.confirmation=="no"?"No confirmado":"Confirmado"}</div>
        <div className="mx-2 px-4 py-2 bg-blue-400 rounded-xl text-gray-100">{userData.status}</div>
        {userData.present ?
          <button
            onClick={() => {
              setShowViewMember(true)
            }}
            className={`${userData.present
              ? "bg-[#800080] text-gray-100"
              : "bg-[#426CB4] text-white"
              } px-4 h-[36px] mx-2 rounded-[10px] font-bold text-[13px]`}
          >
            Ver perfil
          </button>
          : null}

        {(!userData.present) && <button
          onClick={() => {
            
            UpdatePresentState(userData.id, props.loggedUserUid).then(async () => {
              const member = await getMemberById(userData.id);
              props.updateMembersByRegistered()
              if (member) {
                setUserData(member)
                // Realizar acciones adicionales con la información actualizada del miembro
                Toast.fire({
                  icon: "success",
                  title: `Registro de asistencia satisfactorio`,
                });
              } else {
                console.log("No se pudo obtener la información actualizada del miembro.");
              }
            })
          }}
          className={`${userData.status == "Inactivo" || !props.allowButonForCheckIn || !props.isTableOpen
            ? "bg-gray-200 text-gray-400 pointer-events-none"
            : "bg-[#426CB4] text-white"
            } px-4 h-[36px] mx-2 rounded-[10px] font-bold text-[13px]`}
        >
          Check in
        </button>}
      </div>
      {showViewMember && <ViewMember showViewMember={showViewMember} setShowViewMember={setShowViewMember} memberData={userData} />}
    </div>
  );
};

export default GuestUserCard;
