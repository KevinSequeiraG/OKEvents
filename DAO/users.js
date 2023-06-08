import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
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

const RegisterNewUserFromLoginPage = async (user, authUid) => {
  const usersRef = doc(database, "okevents/data/users", authUid);
  await setDoc(usersRef, {
    imageUrl: user.imageUrl,
    name: user.name,
    identification: user.identification,
    email: user.email.trim().toLowerCase(),
    phoneNumber: user.phoneNumber,
  })
    .then((docRef) => {
      Toast.fire({
        icon: "success",
        title: `Usuario registrado correctamente`,
      });
      return true;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      Toast.fire({
        icon: "error",
        title: `No se pudo registrar el usuario`,
      });
      return false;
    });
};

const ValidateUserExists = async (identification, email) => {
  try {
    const usersRef = collection(database, "okevents/data/users");
    const qUserIdentification = query(usersRef, where("identification", "==", identification));
    const qUserEmail = query(usersRef, where("email", "==", email));
    const querySnapshotId = await getDocs(qUserIdentification);
    const querySnapshotEmail = await getDocs(qUserEmail);
    if (!querySnapshotId.empty || !querySnapshotEmail.empty) {
      Toast.fire({
        icon: "error",
        title: `El usuario ingresado ya existe en la base de datos`,
      });
    }
    return querySnapshotId.empty && querySnapshotEmail.empty;
  } catch (error) {
    console.error("Error al validar el usuario:", error);
    return false;
  }
};

export { RegisterNewUserFromLoginPage, ValidateUserExists };
