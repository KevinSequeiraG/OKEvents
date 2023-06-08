import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as XLSX from "xlsx";

export default function FileUpload({setArrayUsers}) {
  const [fileName, setFileName] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  //Get the bulk upload excel file and convert it to json and store in an array
  const readUploadFile = (e) => {
    e.preventDefault();
    setFileLoading(true);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setArrayUsers(json);
        console.log(json);
      };
      console.log(e.target.files[0])
      if (e.target.files[0]!=undefined) {
        reader.readAsArrayBuffer(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setFileLoading(false); 
      }else{
        setFileLoading(false);
      }
    }
  };

  return (
    <>
      <div className="mt-3 flex flex-col justify-center items-center w-full h-[65px] rounded-[10px] bg-[#F3F4F5] hover:bg-gray-100 hover:shadow-md border border-[#8D8D8D] cursor-pointer relative">
        {!fileLoading ? (
          <>
            <p className="font-Inter text-[16px] text-[#8D8D8D] tracking-normal leading-5 absolute">
              {!fileName ? <>Subir archivo .xlsx</> : fileName}
            </p>
          </>
        ) : (
          <>
            <div
              className="inline-block w-[40px] h-[40px] mt-1
                    border-t-8 
                    border-t-light-green-300  
                    rounded-full 
                    animate-spin"
            ></div>
          </>
        )}
        <input
          accept={
            ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          }
          type="file"
          className="opacity-0 h-full !cursor-pointer w-full"
          onChange={readUploadFile}
        />
      </div>
    </>
  );
}
