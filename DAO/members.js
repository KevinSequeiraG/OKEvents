import { database } from "@/BAO/firebaseConfig";
import { collection, getDocs, query, where, addDoc, orderBy, doc, updateDoc, getDoc } from "firebase/firestore";
export { getMembersByEventId };

import Swal from "sweetalert2";

const getMembersByEventId = async (eventId) => {
  try {
    const membersCollection = collection(database, "okevents/data/members");
    const q = query(
      membersCollection,
      where("eventId", "==", eventId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const members = querySnapshot.docs.map((doc) => {
      const memberData = doc.data();
      return { ...memberData, id: doc.id }; // Agregar el ID como propiedad "id"
    });

    return members;
  } catch (error) {
    console.error("Error al obtener los miembros por eventId:", error);
    return [];
  }
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

const downloadFileBulkUpload = () => {
  var link = document.createElement("a");
  link.href =
    "https://firebasestorage.googleapis.com/v0/b/okevents-f3a50.appspot.com/o/bulkLoad%2FCarga%20Masiva%20OKEvents.xlsx?alt=media&token=8bb2f376-1249-4631-bcb5-ef52c6982e3d";
  link.download = "Carga Masiva.xlsx";
  link.dispatchEvent(new MouseEvent("click"));
};

const bulkMemberUpload = (members, eventId) => {
  const memberRef = collection(database, "okevents/data/members");
  const date = new Date();
  members.map((data) => {
    addDoc(memberRef, {
      eventId: eventId,
      imageUrl: "",
      confirmation: "",
      memberID: `${data.hasOwnProperty("Id") ? data.Id.toString().trim().toLowerCase() : ""
        }`,
      name: `${data.hasOwnProperty("Nombre") ? data.Nombre.trim().toLowerCase() : ""
        }`,
      lastName: `${data.hasOwnProperty("Apellidos")
        ? data.Apellidos.trim().toLowerCase()
        : ""
        }`,
      identification: `${data.hasOwnProperty("Cédula")
        ? data.Cédula.toString().trim().toLowerCase()
        : ""
        }`,
      email: `${data.hasOwnProperty("Correo_Electrónico")
        ? data.Correo_Electrónico.trim().toLowerCase()
        : ""
        }`,
      phoneNumber: `${data.hasOwnProperty("Teléfono")
        ? data.Teléfono.toString().trim().toLowerCase()
        : ""
        }`,
      status: `${data.hasOwnProperty("Estatus") ? data.Estatus.trim() : ""
        }`,
      createdAt: date,
      present: false,
      arrivalDate: "",
      registeredBy: "",
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

const addMember = async (user, eventId) => {
  const memberDontExist = await memberNoExists(eventId, user.memberID, user.identification);
  if (memberDontExist) {
    const memberRef = collection(database, "okevents/data/members");
    const date = new Date();
    await addDoc(memberRef, {
      eventId: eventId,
      confirmation: user.confirmation,
      memberID: user.memberID,
      imageUrl: user.imageUrl,
      name: user.name.trim().toLowerCase(),
      identification: user.identification,
      email: user.email.trim().toLowerCase(),
      phoneNumber: user.phoneNumber,
      status: user.status,
      createdAt: date,
      present: false,
      arrivalDate: "",
      registeredBy: "",
    });
    return true;
  }
};

const memberNoExists = async (eventId, memberID, identification) => {
  const memberRef = collection(database, "okevents/data/members");

  const qMemberID = query(memberRef, where("eventId", "==", eventId), where("memberID", "==", memberID));
  const qMemberIdentification = query(memberRef, where("eventId", "==", eventId), where("identification", "==", identification));

  const querySnapshotId = await getDocs(qMemberID);
  const querySnapshotIdentif = await getDocs(qMemberIdentification);
  console.log(memberID, identification)
  console.log("whyyy", !querySnapshotId.empty || !querySnapshotIdentif.empty)
  if (!querySnapshotId.empty || !querySnapshotIdentif.empty) {
    Toast.fire({
      icon: "error",
      title: `El miembro ingresado ya se encuentra ingresado en el evento`,
    });
  }

  return querySnapshotId.empty && querySnapshotIdentif.empty;
};

const getMemberById = async (memberId) => {
  try {
    const memberRef = doc(database, "okevents/data/members", memberId);
    const memberDoc = await getDoc(memberRef);

    if (memberDoc.exists()) {
      const memberData = memberDoc.data();
      return { id: memberDoc.id, ...memberData };
    } else {
      console.log(`No se encontró el miembro con ID ${memberId}.`);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener el miembro con ID ${memberId}:`, error);
    return null;
  }
};

const UpdatePresentState = async (memberId, loggedUserUid) => {
  try {
    const memberRef = doc(database, "okevents/data/members", memberId);
    const currentTime = new Date();

    await updateDoc(memberRef, { present: true, arrivalDate: currentTime, registeredBy: loggedUserUid });

    console.log(`Campo "present" actualizado correctamente para el miembro con ID ${memberId}.`);
  } catch (error) {
    console.error(`Error al actualizar el campo "present" del miembro con ID ${memberId}:`, error);
  }
};

export { downloadFileBulkUpload, bulkMemberUpload, memberNoExists, addMember, UpdatePresentState, getMemberById };
