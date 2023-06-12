import { database } from "@/BAO/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  orderBy,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";

import Swal from "sweetalert2";

const getRegister = async (uid) => {
  const registerRef = doc(database, `okevents/data/users/`, uid);
  const response = await getDoc(registerRef);
  return response.data().name;
};

const createReport = async (eventId) => {
  const dataMembers = [];
  const memberRef = collection(database, `okevents/data/members`);
  const q = query(memberRef, where("eventId", "in", [eventId, parseInt(eventId)]));

  const response = await getDocs(q);
  const promises = response.docs.map(async (data) => {
    let completeHour = "";
    if (data.data().arrivalDate != "") {
      const date = new Date(data.data().arrivalDate.seconds * 1000);
      const hour = date.getHours();
      const minutes = date.getMinutes();

      completeHour = `${hour}:${minutes}`;
    }
    if (data.data().registeredBy != "") {
      const registerName = await getRegister(data.data().registeredBy);
      dataMembers.push({
        Cédula: data.data().identification,
        Nombre: data.data().name,
        Confirmación: data.data().confirmation,
        Registrador: registerName,
        Ingreso: completeHour,
      });
    } else {
      dataMembers.push({
        Cédula: data.data().identification,
        Nombre: data.data().name,
        Confirmación: data.data().confirmation,
        Registrador: "",
        Ingreso: completeHour,
      });
    }
  });

  await Promise.all(promises);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(dataMembers);
  XLSX.utils.book_append_sheet(wb, ws, "Miembros");
  XLSX.writeFile(wb, `Lista de Usuarios.xlsx`);
};

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

export { createReport };
