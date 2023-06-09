import React, { useState } from "react";
import FileUpload from "../../layout/fileUpload";
import { downloadFileBulkUpload, bulkMemberUpload } from "@/DAO/members";

export default function BulkModal(props) {
  const [isLoading, setIsLoading] = useState();
  const [arrayUsers, setArrayUsers] = useState([]);

  const handleDownload = () => {
    downloadFileBulkUpload();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[51] ${
        props.showAddBulkModal ? "" : "hidden"
      }`}
    >
      <>
        <div className="mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none max-w-xl max-h-fit my-auto">
          <div className="relative inset-0 mx-auto w-full">
            <div className="flex items-center justify-center min-h-full text-center relative">
              <div className="relative bg-[#F8F9FA] rounded-[10px] text-left overflow-hidden shadow-xl transform transition-all max-w-xl w-full">
                <div className="bg-[#F8F9FA] p-8 relative">
                  <h3 className="text-left font-bold text-[21px] leading-4 tracking-normal text-[#101217]">
                    Carga masiva
                  </h3>

                  {!isLoading ? (
                    <>
                      <div className="mt-8 px-3">
                        {/* DOWNLOAD BUTTON */}
                        <p className="text-[12px] font-semibold leading-4 tracking-normal text-left text-[#101217]">
                          Descargar plantilla
                        </p>
                        <button
                          onClick={() => {
                            handleDownload();
                          }}
                          className="mt-3 flex justify-center items-center w-full h-[65px] rounded-[10px] bg-[#426CB4] hover:shadow-md border border-[#101217]"
                        >
                          <span className="font-Inter text-[16px] text-center text-white tracking-normal leading-5 ml-2">
                            Descargar
                          </span>
                        </button>

                        {/* UPLOAD BUTTON */}
                        <p className="text-[12px] font-semibold leading-4 tracking-normal text-left text-[#101217] mt-8">
                          Subir archivo
                        </p>
                        <FileUpload setArrayUsers={setArrayUsers} />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[16px] font-medium leading-4 tracking-normal text-left text-[#101217] mt-8 mb-1">
                        Agregando miembros a tu evento
                      </p>
                      <p className="text-[16px] font-medium leading-4 tracking-normal text-left text-[#101217] mb-10">
                        Esto podría tomar un tiempo, por favor{" "}
                        <b>no cierres ni refresques la pestaña.</b>
                      </p>
                      <div className="flex space-x-2 p-5 justify-center items-center">
                        <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-[bounce_1.3s_ease-in-out_infinite] delay-75"></div>
                        <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-[bounce_1.2s_ease-in-out_infinite] delay-75"></div>
                        <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-[bounce_1.1s_ease-in-out_infinite] delay-75"></div>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-[#F8F9FA]  pb-5 pt-2 px-9 flex flex-row-reverse justify-between">
                  {!isLoading ? (
                    <>
                      <button className="py-3 rounded-[10px] bg-[#426CB4] hover:bg-blue-600 hover:shadow-md px-8 text-white"
                      onClick={
                        isLoading
                          ? null
                          : () => {
                            bulkMemberUpload(arrayUsers, props.eventId);
                            }
                      }
                      >
                        Subir
                      </button>

                      <button
                        className="py-3 rounded-[10px] bg-[#E9E9EB] hover:bg-gray-300 hover:shadow-md px-4"
                        onClick={() => {
                          props.setShowBulkModal(false);
                        }}
                      >
                        <span className="font-Inter font-semibold text-[16px] text-center text-[#899592] tracking-normal leading-5">
                          Cancelar
                        </span>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-50 inset-0 bg-[#707070] bg-opacity-[0.35] transition-opacity cursor-pointer"></div>
      </>
    </div>
  );
}
