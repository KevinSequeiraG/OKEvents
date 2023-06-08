import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { database } from "@/BAO/firebaseConfig";
import Swal from "sweetalert2";

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

const downloadFileBulkUpload = () => {
  var link = document.createElement("a");
  link.href =
    "https://firebasestorage.googleapis.com/v0/b/okevents-f3a50.appspot.com/o/bulkLoad%2FCarga%20Masiva%20OKEvents.xlsx?alt=media&token=8bb2f376-1249-4631-bcb5-ef52c6982e3d";
  link.download = "Carga Masiva.xlsx";
  link.dispatchEvent(new MouseEvent("click"));
};

const bulkMemberUpload = (members, eventId) => {
  const memberRef = collection(database, "okevents/data/members");

  members.map((data) => {
    addDoc(memberRef, {
      eventId: eventId,
      confirmation:"",
      memberID: `${
        data.hasOwnProperty("Id") ? data.Id.toString().trim().toLowerCase() : ""
      }`,
      name: `${
        data.hasOwnProperty("Nombre") ? data.Nombre.trim().toLowerCase() : ""
      }`,
      lastName: `${
        data.hasOwnProperty("Apellidos") ? data.Apellidos.trim().toLowerCase() : ""
      }`,
      identification: `${
        data.hasOwnProperty("Cédula") ? data.Cédula.toString().trim().toLowerCase() : ""
      }`,
      email: `${
        data.hasOwnProperty("Correo_Electrónico") ? data.Correo_Electrónico.trim().toLowerCase() : ""
      }`,
      phone: `${
        data.hasOwnProperty("Teléfono") ? data.Teléfono.toString().trim().toLowerCase() : ""
      }`,
      status: `${
        data.hasOwnProperty("Estatus") ? data.Estatus.trim().toLowerCase() : ""
      }`,
    });
  });
  //   .then((docRef) => {
  //     Toast.fire({
  //       icon: "success",
  //       title: `Evento creado correctamente`,
  //     });
  //     return true;
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //     Toast.fire({
  //       icon: "success",
  //       title: `No se pudo crear el evento`,
  //     });
  //     return false;
  //   });
};

export { downloadFileBulkUpload, bulkMemberUpload };
