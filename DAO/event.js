import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
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

const CreateEventNew = (event, loggedUserEmail) => {
  const eventsRef = collection(database, "okevents/data/events");
  const startDate = new Date(event.startDate);
  const adjustedStartDate = new Date(event.startDate + 'T00:00:00');
  adjustedStartDate.setHours(adjustedStartDate.getHours() + adjustedStartDate.getTimezoneOffset() / 60);

  const endDate = new Date(event.finishDate);
  const emptyArrayMails = [loggedUserEmail];
  const emptyArray = [];
  addDoc(eventsRef, {
    name: event.name,
    eventId: event.eventId,
    description: event.description,
    eventType: event.eventType,
    startDate: adjustedStartDate,
    regisMails: emptyArrayMails,
    adminMails: emptyArrayMails,
    // endDate: endDate,
    // isOpen: true,
    closedBy: emptyArray,
    imageUrl: event.imageUrl ? event.imageUrl : "",
    active: true,
  })
    .then((docRef) => {
      Toast.fire({
        icon: "success",
        title: `Evento creado correctamente`,
      });
      return true;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      Toast.fire({
        icon: "error",
        title: `No se pudo crear el evento`,
      });
      return false;
    });
};

const UpdateEvent = (event) => {
  const eventToEdit = doc(database, "okevents/data/events", event.id);
  const startDate = new Date(event.startDate);
  const adjustedStartDate = new Date(event.startDate + 'T00:00:00');
  adjustedStartDate.setHours(adjustedStartDate.getHours() + adjustedStartDate.getTimezoneOffset() / 60);
  updateDoc(eventToEdit, {
    name: event.name,
    description: event.description,
    eventType: event.eventType,
    startDate: adjustedStartDate,
    imageUrl: event.imageUrl ? event.imageUrl : "",
  })
    .then(() => {
      Toast.fire({
        icon: "success",
        title: `Evento editado correctamente`,
      });
      return true;
    })
    .catch((error) => {
      console.error("Error editing document: ", error);
      Toast.fire({
        icon: "error",
        title: `No se pudo editar el evento`,
      });
      return false;
    });
};

const DeleteEvent = (eventId) => {
  const eventToDelete = doc(database, "okevents/data/events", eventId);
  updateDoc(eventToDelete, {
    active: false,
  })
    .then(() => {
      Toast.fire({
        icon: "success",
        title: `Evento eliminado correctamente`,
      });
      return true;
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
      Toast.fire({
        icon: "error",
        title: `No se pudo eliminar el evento`,
      });
      return false;
    });
};

const ValidateEventId = async (eventId) => {
  try {
    const eventsCollection = collection(database, "okevents/data/events");
    const q = query(eventsCollection, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al validar el eventId:", error);
    return false;
  }
};

const getAllEvents = async () => {
  try {
    const eventsCollection = collection(database, "okevents/data/events");
    const querySnapshot = await getDocs(eventsCollection);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return [];
  }
};

const getActiveEvents = async () => {
  try {
    const eventsCollection = collection(database, "okevents/data/events");
    const qActiveEvents = query(eventsCollection, where("active", "==", true));
    const querySnapshot = await getDocs(qActiveEvents);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return [];
  }
};

const getEventById = async (eventId) => {
  try {
    var eventsData = [];
    const eventsCollection = collection(database, "okevents/data/events");
    const q = query(eventsCollection, where("eventId", "==", eventId));
    return await getDocs(q).then((response) => {
      response.docs.map((data) => {
        eventsData.push({ ...data.data(), id: data.id });
      });
      return eventsData;
    });
    // return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al validar el eventId:", error);
    return false;
  }
};

const handleEventState = async (eventId, loggeduid) => {
  try {
    const eventsCollection = collection(database, "okevents/data/events");
    const q = query(eventsCollection, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const eventData = querySnapshot.docs[0].data();
      const closedBy = eventData.closedBy || []; // Obtener el array existente o un array vacío si no existe

      let updatedClosedBy;
      if (!closedBy.includes(loggeduid)) {
        // Agregar el loggeduid al array si no existe
        updatedClosedBy = [...closedBy, loggeduid];
      } else {
        // Eliminar el loggeduid del array si ya existe
        updatedClosedBy = closedBy.filter((uid) => uid !== loggeduid);
      }

      await updateDoc(docRef, { closedBy: updatedClosedBy }).then(() => {
        let title = "Se ha actualizado el estado de la mesa";
        Toast.fire({
          icon: "success",
          title: title,
        });
        return true;
      });
    } else {
      console.log(
        "No se encontró ningún evento con los criterios de búsqueda."
      );
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar la mesa:", error);
    return false;
  }
};

const addUserMailToEvent = async (eventId, userType, userEmail) => {
  const eventData = await getEventById(eventId);
  var eventToEdit = doc(database, `okevents/data/events`, eventData[0].id);
  var adminMailsArray = eventData[0].adminMails;
  var regisMailsArray = eventData[0].regisMails;

  if (userType == "Administrador" && !adminMailsArray.includes(userEmail)) {
    adminMailsArray.push(userEmail);
    await setDoc(
      eventToEdit,
      {
        adminMails: adminMailsArray,
      },
      { merge: true }
    );
    Toast.fire({
      icon: "success",
      title: `Usuario registrado correctamente`,
    });
  } else if (
    userType == "Registrador" &&
    !regisMailsArray.includes(userEmail)
  ) {
    regisMailsArray.push(userEmail);
    await setDoc(
      eventToEdit,
      {
        regisMails: regisMailsArray,
      },
      { merge: true }
    );
    Toast.fire({
      icon: "success",
      title: `Usuario registrado correctamente`,
    });
  } else {
    Toast.fire({
      icon: "error",
      title: `El usuario ya existe en el evento`,
    });
  }
};

export {
  CreateEventNew,
  ValidateEventId,
  getAllEvents,
  getEventById,
  handleEventState,
  addUserMailToEvent,
  UpdateEvent,
  DeleteEvent,
  getActiveEvents
};
