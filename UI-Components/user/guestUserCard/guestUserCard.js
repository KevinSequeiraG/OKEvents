/* eslint-disable @next/next/no-img-element */
import ViewMember from "@/UI-Components/modal/viewMember";
import Link from "next/link";
import { useState, useEffect } from "react";

const GuestUserCard = (props) => {
  const [statusProfile, setStatusProfile] = useState(props.stat);
  const [userName, setuserName] = useState()
  const [showViewMember, setShowViewMember] = useState(false)

  useEffect(() => {
    setuserName(props?.userName?.charAt(0).toUpperCase() + props?.userName?.slice(1));
  }, [])


  return (
    <div className="flex flex-row justify-between mb-5 items-center w-[50%] mx-auto border px-5 py-3 rounded-xl">
      <div className="flex flex-row items-center">
        {props.imageProfileUrl != "" && props.imageProfileUrl != undefined ? (
          <img
            className="inline-block h-9 w-9 sm:h-12 sm:w-12 rounded-full cursor-pointer !object-cover"
            src={props.imageProfileUrl}
            alt="Foto de perfil"
          />
        ) : (
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
          </svg>
        )}
        <div className="ml-3">
          <div className="font-bold  flex items-center">
            <p className="text-[13px] truncate mr-1">
              {props.userName.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
                    letra.toUpperCase()
                  )}
            </p>
          </div>
          {props.userDNI ? (
            <p className="text-[10px] text-[#899592]">Ced: {props.userDNI}</p>
          ) : (
            null
          )}
        </div>
      </div>

      {props.activeUser ?
        <button
          onClick={() => {
            setShowViewMember(true)
          }}
          className={`${props.activeUser
            ? "bg-gray-200 text-black"
            : "bg-green-500 text-white"
            } px-4 h-[36px] rounded-[10px] font-bold text-[13px]`}
        >
          Ver perfil
        </button>
        : null}

      {!props.activeUser ? <button
        onClick={() => {
          props.activeUser ? null : props.updateState(props.id);
        }}
        className={`${props.activeUser
          ? "bg-gray-200 text-black"
          : "bg-green-500 text-white"
          } px-4 h-[36px] rounded-[10px] font-bold text-[13px]`}
      >
        Check in
      </button> : null}
      <ViewMember showViewMember={showViewMember} setShowViewMember={setShowViewMember} memberData={props.user} />
    </div>
  );
};

export default GuestUserCard;
