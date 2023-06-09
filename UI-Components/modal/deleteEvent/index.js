import { DeleteEvent } from "@/DAO/event";
import { XCloseIcon } from "@/public/svgs/Icons";
import React from "react";
import { useRouter } from "next/router";

export default function DeleteEventModal(props) {
  const router = useRouter();
  const handleDelete = () => {
    DeleteEvent(props.eventId);
    router.push("/home");
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[51] ${
        props.showAddUsersModal ? "" : "hidden"
      }`}
    >
      <div className="px-5 py-5 w-[27rem] h-auto bg-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl">
        <div
          className="absolute right-4 cursor-pointer"
          onClick={() => props.setShowAddUsersModal(false)}
        >
          <XCloseIcon />
        </div>
        <p className="text-center font-bold text-[1.4rem]">Eliminar evento</p>
        <p className="text-center font-medium text-[1rem] mt-2">
          ¿Está seguro de que desea eliminar este evento?
        </p>
        <div className="flex justify-between mt-5">
          <button
            className="bg-gray-500 text-gray-100 px-5 py-3 rounded-xl mt-3 hover:bg-gray-400"
            onClick={() => {
              props.setShowAddUsersModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="bg-red-400 text-white px-5 py-3 rounded-xl mt-4 hover:bg-red-500"
            onClick={() => {
              handleDelete();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
