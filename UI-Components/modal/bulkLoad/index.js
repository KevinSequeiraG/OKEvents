import React, { useState } from "react";
import FileUpload from "../../layout/fileUpload";
import { downloadFileBulkUpload, bulkMemberUpload } from "@/DAO/members";

//Firebase imports
// import { database, secondaryAuth } from "../../../lib/firebaseConfig";
// import {
//   collection,
//   addDoc,
//   setDoc,
//   doc,
//   updateDoc,
//   query,
//   where,
//   getDocs,
//   getDoc,
// } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   signOut,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import Swal from "sweetalert2";
// import { useEffect } from "react";
// import mailTemplate from "../../../lib/mailTemplate";

export default function BulkModal(props) {
  const [isLoading, setIsLoading] = useState();
  const [arrayUsers, setArrayUsers] = useState([]);

  const handleDownload = () => {
    downloadFileBulkUpload();
  };
  //   const monthNames = [
  //     "Ene",
  //     "Feb",
  //     "Mar",
  //     "Abr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Ago",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dic",
  //   ];

  //   const daysNames = [
  //     "Domingo",
  //     "Lunes",
  //     "Martes",
  //     "Miércoles",
  //     "Jueves",
  //     "Viernes",
  //     "Sábado",
  //   ];

  //   const [showBulkModal, setShowBulkModal] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [arrayRewards, setArrayRewards] = useState([]);

  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: "top-end",
  //     showConfirmButton: false,
  //     timer: 2000,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //       toast.addEventListener("mouseenter", Swal.stopTimer);
  //       toast.addEventListener("mouseleave", Swal.resumeTimer);
  //     },
  //   });

  //   const wait = (ms) => new Promise((r, j) => setTimeout(r, ms));
  //   const [noExcelData, setNoExcelData] = useState(false);
  //   const [numberExcelItems, setNumberExcelItems] = useState(0);

  //   function generatePassword(data, password) {
  //     if (data) {
  //       return password.toString();
  //     }else{
  //       const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     let password = '';
  //     for (let i = 0; i < 8; i++) {
  //       const randomIndex = Math.floor(Math.random() * chars.length);
  //       password += chars[randomIndex];
  //     }
  //     return password;
  //     }
  //   }

  //   const getUserUid = async (userUid, data2) => {
  //     const date = new Date();
  //     const visitRef = doc(database, `event+/data/visit/${userUid + eventId}`);
  //     await setDoc(visitRef, {
  //       eventId: eventId,
  //       uid: userUid,
  //       condition: "pending",
  //       completeRewards: [""],
  //       access: `${data2.Acceso != null ? data2.Acceso : data2.Tipo_usuario == "Usuario" ? "INVI" : "No aplica" }`,
  //       adviser: `${data2.Encargado != null ? data2.Encargado : ""}`,
  //       userType: `${
  //         data2.Tipo_usuario != null ? data2.Tipo_usuario : "Usuario"
  //       }`,
  //       createdAt: date,
  //       checkedAt: date,
  //       totalPoints: 0,
  //       alreadyPlayed: false,
  //       registeredBy: "bulkLoad",
  //       // condition: `${data2.condition != null ? data2.condition : "pending"}`,
  //       // completeRewards: [data2.completeRewards2 != null?data2.completeRewards2:'' , data2.completeRewards3 != null?data2.completeRewards3:'', data2.completeRewards4 != null?data2.completeRewards4:'', data2.completeRewards5 != null?data2.completeRewards5:''],
  //       // access: `${data2.Acceso != null ? data2.Acceso : "L1"}`,
  //     })
  //       .then(async () => {
  //         await sendVisitEmail(data2);
  //       })
  //       .catch((err) => {
  //         Toast.fire({
  //           icon: "error",
  //           title: `Error al registrar usuario`,
  //         });
  //       });
  //   };

  //   //this functions return the results of a promise
  //   function getDataPromise(dataItems) {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         resolve(dataItems);
  //       } catch (error) {
  //         reject(console.log(error));
  //       }
  //     });
  //   }

  //   //Aca se valida si el correo ya existe en auth
  //   const userAlreadyExists = async (email) => {
  //     let exists = false;
  //     let userRecord;
  //     await fetch("/api/userAlreadyExists", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(email),
  //     })
  //       .then(async (res) => {
  //         if (res.status === 200) {
  //           res = await res.json();
  //           exists = true;
  //           userRecord = res;
  //           return { userUid: userRecord, userExist: exists };
  //         } else {
  //           res = await res.json();
  //           exists = false;
  //           userRecord = res;
  //           return { userUid: userRecord, userExist: exists };
  //         }
  //       })
  //       .catch(() => {});
  //     return { userUid: userRecord, userExist: exists };
  //   };

  //   async function createUserAuth(data) {
  //     const newPasswordGenerated = generatePassword(data.hasOwnProperty("Contraseña"), data.Contraseña);
  //     console.log(newPasswordGenerated)
  //     const date = new Date();
  //     await fetch("/api/createUser", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         newUserEmail: data.Correo_electrónico_principal.trim().toLowerCase(),
  //         newUserPassword: newPasswordGenerated,
  //         userName: data.Nombre.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
  //           letra.toUpperCase()
  //         ),
  //       }),
  //     })
  //       .then(async (res) => {
  //         //if all good
  //         if (res.status === 200) {
  //           res = await res.json();
  //           //ref to insert in USERS

  //           const usersTableRef = doc(database, `event+/data/users/${res.uid}`);
  //           await setDoc(usersTableRef, {
  //             imageProfileUrl: "",
  //             name: `${
  //               data.hasOwnProperty("Nombre")
  //                 ? data.Nombre.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             lastName: `${
  //               data.hasOwnProperty("Apellidos")
  //                 ? data.Apellidos.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             identification: `${
  //               data.hasOwnProperty("Identificación") ? data.Identificación : ""
  //             }`,
  //             userType: `${
  //               data.hasOwnProperty("Tipo_usuario") ? data.Tipo_usuario : "Usuario"
  //             }`,
  //             nirPhone: `${data.hasOwnProperty("País") ? data.País : ""}`,
  //             phone: `${data.hasOwnProperty("Teléfono") ? data.Teléfono : ""}`,
  //             mainEmail: `${
  //               data.hasOwnProperty("Correo_electrónico_principal")
  //                 ? data.Correo_electrónico_principal.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             personalEmail: `${
  //               data.hasOwnProperty("Correo_electrónico_personal")
  //                 ? data.Correo_electrónico_personal.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             alternateEmail: `${
  //               data.hasOwnProperty("Correo_electrónico_alternativo")
  //                 ? data.Correo_electrónico_alternativo.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             userType: `${
  //               data.hasOwnProperty("Tipo_usuario")
  //                 ? data.Tipo_usuario.trim()
  //                 : ""
  //             }`,
  //             company: `${
  //               data.hasOwnProperty("Empresa")
  //                 ? data.Empresa.trim()
  //                 : ""
  //             }`,
  //             language: `${
  //               data.hasOwnProperty("Idioma")
  //                 ? data.Idioma.trim()
  //                 : "Español"
  //             }`,
  //             employeeNumber: `${
  //               data.hasOwnProperty("Num_empleado")
  //                 ? data.Num_empleado.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             collegiateNumber: `${
  //               data.hasOwnProperty("Num_colegiado")
  //                 ? data.Num_colegiado.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             partnerNumber: `${
  //               data.hasOwnProperty("Num_socio")
  //                 ? data.Num_socio.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             foodtAllergy: `${
  //               data.hasOwnProperty("Alergia_Alimenticia")
  //                 ? data.Alergia_Alimenticia.trim()
  //                 : ""
  //             }`,
  //             vehicleNumber: `${
  //               data.hasOwnProperty("Placa_vehicular")
  //                 ? data.Placa_vehicular.trim().toLowerCase()
  //                 : ""
  //             }`,
  //             superAdmin: false,
  //             myEvents: [`${eventId}`],
  //             createdAt: date,
  //             showCompleteRegistration: true,
  //           }).then(async () => {
  //             await sendFirstEmailToUser(data, newPasswordGenerated);
  //             //insert in VISIT

  //             await getUserUid(res.uid, data).then(async () => {
  //               addPersonalReward(res.uid, data);
  //               await insertEventMails(res.uid, data.Tipo_usuario);
  //             });
  //           });

  //           return;
  //         }
  //         return;
  //       })
  //       .catch(() => {});
  //   }

  //   const sendFirstEmailToUser = async (dataU, newPasswordGenerated) => {
  //     const data = {
  //       email: "account@eventplus.com",
  //       to: dataU.Correo_electrónico_principal,
  //       issue: "Envío de credenciales para inicio de sesión en Event+",
  //       consultation: "credentials_email",
  //       variables: {
  //         username:
  //           dataU.Nombre.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
  //             letra.toUpperCase()
  //           ) +
  //           " " +
  //           dataU.Apellidos.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
  //             letra.toUpperCase()
  //           ),
  //         linkToEventPlus:
  //           dataU.Tipo_usuario == "Usuario"
  //             ? "user.eventplus.app"
  //             : dataU.Tipo_usuario == "Registrador" ||
  //               dataU.Tipo_usuario == "StandStaff"
  //             ? "https://register-eventplus.vercel.app/"
  //             : "admin.eventplus.app",
  //         mainEmail: dataU.Correo_electrónico_principal,
  //         password: newPasswordGenerated,
  //       },
  //     };
  //     await fetch("/api/sendEmail", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((res) => {
  //         if (res.status === 200) {
  //         }
  //       })
  //       .catch(() => {});
  //   };

  //   const sendVisitEmail = async (dataU) => {
  //     //get event data
  //     const eventRef = collection(database, `event+/data/events`);
  //     const qEvent = query(
  //       eventRef,
  //       where("eventId", "==", eventId != null ? eventId : data.eventId)
  //     );

  //     await getDocs(qEvent).then(async (response) => {
  //       response.docs.map(async (eventDataR) => {
  //         var eventData = eventDataR.data();

  //         //Variables for email dates
  //         //Start dates
  //         const startYearOfEvent = new Date(
  //           parseInt(eventData.startDate)
  //         ).getFullYear();
  //         const startMonthOfEvent =
  //           new Date(parseInt(eventData.startDate)).getMonth() + 1 < 10
  //             ? "0" + (new Date(parseInt(eventData.startDate)).getMonth() + 1)
  //             : new Date(parseInt(eventData.startDate)).getMonth() + 1;
  //         const startDayOfEvent =
  //           new Date(parseInt(eventData.startDate)).getDate() < 10
  //             ? "0" + new Date(parseInt(eventData.startDate)).getDate()
  //             : new Date(parseInt(eventData.startDate)).getDate();
  //         const startDayOfEventDayNumber = new Date(
  //           parseInt(eventData.startDate)
  //         ).getDay();
  //         var startHoursOfEventInString =
  //           new Date(parseInt(eventData.startHour)).getHours() < 10
  //             ? "0" + new Date(parseInt(eventData.startHour)).getHours()
  //             : new Date(parseInt(eventData.startHour)).getHours();
  //         var startHoursOfEvent =
  //           new Date(parseInt(eventData.startHour)).getHours() + 6 >= 24
  //             ? new Date(parseInt(eventData.startHour)).getHours() - 18
  //             : new Date(parseInt(eventData.startHour)).getHours() + 6;
  //         var startMinutesOfEvent =
  //           new Date(parseInt(eventData.startHour)).getMinutes() < 10
  //             ? "0" + new Date(parseInt(eventData.startHour)).getMinutes()
  //             : new Date(parseInt(eventData.startHour)).getMinutes();
  //         var startHour12HoursFormat = `${
  //           daysNames[startDayOfEventDayNumber]
  //         }, ${startDayOfEvent} de ${
  //           monthNames[new Date(parseInt(eventData.startDate)).getMonth()]
  //         } de ${startYearOfEvent} a las ${
  //           startHoursOfEventInString >= 13
  //             ? startHoursOfEventInString - 12
  //             : startHoursOfEventInString
  //         }:${startMinutesOfEvent} ${
  //           startHoursOfEventInString >= 12 ? "p.m" : "a.m"
  //         }`;

  //         //End dates
  //         const endYearOfEvent = new Date(
  //           parseInt(eventData.endDate)
  //         ).getFullYear();
  //         const endMonthOfEvent =
  //           new Date(parseInt(eventData.endDate)).getMonth() + 1 < 10
  //             ? "0" + (new Date(parseInt(eventData.endDate)).getMonth() + 1)
  //             : new Date(parseInt(eventData.endDate)).getMonth() + 1;
  //         const endDayOfEvent =
  //           new Date(parseInt(eventData.endDate)).getDate() < 10
  //             ? "0" + new Date(parseInt(eventData.endDate)).getDate()
  //             : new Date(parseInt(eventData.endDate)).getDate();
  //         const endDayOfEventDayNumber = new Date(
  //           parseInt(eventData.endDate)
  //         ).getDay();
  //         var endHoursOfEventInString =
  //           new Date(parseInt(eventData.endHour)).getHours() < 10
  //             ? "0" + new Date(parseInt(eventData.endHour)).getHours()
  //             : new Date(parseInt(eventData.endHour)).getHours();
  //         var endHoursOfEvent =
  //           new Date(parseInt(eventData.endHour)).getHours() + 6 >= 24
  //             ? new Date(parseInt(eventData.endHour)).getHours() - 18
  //             : new Date(parseInt(eventData.endHour)).getHours() + 6;
  //         var endMinutesOfEvent =
  //           new Date(parseInt(eventData.endHour)).getMinutes() < 10
  //             ? "0" + new Date(parseInt(eventData.endHour)).getMinutes()
  //             : new Date(parseInt(eventData.endHour)).getMinutes();
  //         var endHour12HoursFormat = `${
  //           daysNames[endDayOfEventDayNumber]
  //         }, ${endDayOfEvent} de ${
  //           monthNames[new Date(parseInt(eventData.endDate)).getMonth()]
  //         } de ${endYearOfEvent} a las ${
  //           endHoursOfEventInString >= 13
  //             ? endHoursOfEventInString - 12
  //             : endHoursOfEventInString
  //         }:${endMinutesOfEvent} ${
  //           endHoursOfEventInString >= 12 ? "p.m" : "a.m"
  //         }`;

  //         //Object that contains all the data for the email
  //         const dataToEmail = {
  //           email: "account@eventplus.com",
  //           to: dataU.Correo_electrónico_principal,
  //           issue: "Te han añadido a un nuevo evento en Event+",
  //           consultation: "email_for_each_event",
  //           variables: {
  //             username:
  //               dataU.Nombre.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
  //                 letra.toUpperCase()
  //               ) +
  //               " " +
  //               dataU.Apellidos.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
  //                 letra.toUpperCase()
  //               ),
  //             eventName: eventData.name,
  //             eventType: eventData.eventType,
  //             eventImageUrl: eventData.eventImageUrl
  //               ? eventData.eventImageUrl
  //               : "https://firebasestorage.googleapis.com/v0/b/event-plus-5689d.appspot.com/o/docs%2FdefaultEventPicture.png?alt=media&token=9dff151f-6f74-47a0-88be-a085aee906e4",
  //             eventAddress: eventData.location,
  //             eventId: eventData.eventId,
  //             eventDescription: eventData.description,
  //             eventPlanner: eventData.plannerName.replace(
  //               /(^\w{1})|(\s+\w{1})/g,
  //               (letra) => letra.toUpperCase()
  //             ),
  //             startDate: `${startDayOfEvent} de ${
  //               monthNames[new Date(parseInt(eventData.startDate)).getMonth()]
  //             }, ${startYearOfEvent}`,
  //             endDate: `${endDayOfEvent} de ${
  //               monthNames[new Date(parseInt(eventData.endDate)).getMonth()]
  //             }, ${endYearOfEvent}`,
  //             eventCalendarLink: `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventData.name}&details=${eventData.description}&location=${eventData.location}, ${eventData.province}, ${eventData.country}&dates=${startYearOfEvent}${startMonthOfEvent}${startDayOfEvent}T${startHoursOfEvent}${startMinutesOfEvent}00Z%2F${endYearOfEvent}${endMonthOfEvent}${endDayOfEvent}T${endHoursOfEvent}${endMinutesOfEvent}00Z`,
  //             eventGeneralAddress: `${eventData.canton}, ${eventData.province}, ${eventData.country}`,
  //             startHour: startHour12HoursFormat,
  //             endHour: endHour12HoursFormat,
  //             linkToEventPlus:
  //               dataU.Tipo_usuario == "Usuario"
  //                 ? "user.eventplus.app"
  //                 : dataU.Tipo_usuario == "Registrador" ||
  //                   dataU.Tipo_usuario == "StandStaff"
  //                 ? "https://register-eventplus.vercel.app/"
  //                 : "admin.eventplus.app",
  //           },
  //         };

  //         //Sends the email
  //         await fetch("/api/sendEmail", {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json, text/plain, */*",
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(dataToEmail),
  //         })
  //           .then((res) => {
  //             if (res.status === 200) {
  //               //All good
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       });
  //     });
  //   };

  //   const registerUser = async () => {
  //     let countOfUsers = 0;
  //     setNumberExcelItems(0);
  //     if (arrayUsers.length == 0) {
  //       setNoExcelData(true);
  //     } else {
  //       const eventRef = collection(database, `event+/data/events`);
  //       const q = query(
  //         eventRef,
  //         where("eventId", "==", eventId != null ? eventId : data.eventId)
  //       );
  //       await getDocs(q).then(async (response) => {
  //         response.docs.map(async (data) => {
  //           var eventData = data.data();
  //           if (
  //             eventData.participantLimit &&
  //             eventData.participantLimit != "" &&
  //             parseInt(eventData.participantLimit) <=
  //               eventData.totalCheckingUsers +
  //                 eventData.totalPendingUsers +
  //                 arrayUsers.length
  //           ) {
  //             Toast.fire({
  //               icon: "error",
  //               title: "El número de usuarios excede el límite de participantes",
  //             });
  //             return;
  //           } else {
  //             setIsLoading(true);
  //             arrayUsers.map(async (data, i) => {
  //               await getDataPromise(
  //                 userAlreadyExists(
  //                   data.Correo_electrónico_principal.trim().toLowerCase()
  //                 )
  //               )
  //                 .then(async (result) => {
  //                   if (!result.userExist) {
  //                     await createUserAuth(data);
  //                     countOfUsers = countOfUsers + 1;
  //                   } else {
  //                     const visitRef = collection(database, `event+/data/visit`);
  //                     const qVisit = query(
  //                       visitRef,
  //                       where("uid", "==", result.userUid.uid),
  //                       where("eventId", "==", eventId)
  //                     );
  //                     await getDocs(qVisit).then(async (response) => {
  //                       if (response.size === 0) {
  //                         countOfUsers = countOfUsers + 1;
  //                         await getUserUid(result.userUid.uid, data).then(
  //                           async () => {
  //                             const usersTableRef = doc(
  //                               database,
  //                               `event+/data/users/${result.userUid.uid}`
  //                             );
  //                             await getDoc(usersTableRef).then(async (userG) => {
  //                               var userG = userG.data();
  //                               await updateDoc(usersTableRef, {
  //                                 myEvents: [...userG.myEvents, `${eventId}`],
  //                               });
  //                             });
  //                             addPersonalReward(result.userUid.uid, data);
  //                             await insertEventMails(result.userUid.uid, data.Tipo_usuario);
  //                           }
  //                         );
  //                       }
  //                     });
  //                   }
  //                 })
  //                 .then(async () => {
  //                   if (i + 1 == arrayUsers.length) {
  //                     await wait(5000).then(async () => {
  //                       addTotalOfUsers(countOfUsers);
  //                       await getUsersData();
  //                       setIsLoading(false);
  //                       setShowBulkModal(false);
  //                     });
  //                   }
  //                 });
  //             });
  //           }
  //         });
  //       });
  //     }
  //   };

  //   const insertEventMails = async (userUid, userType) => {
  //     const eventRef = collection(database, `event+/data/events`);
  //     const q = query(
  //       eventRef,
  //       where("eventId", "==", eventId != null ? eventId : data.eventId)
  //     );
  //     await getDocs(q).then(async (response) => {
  //       response.docs.map(async (data) => {
  //         var eventData = data.data();
  //         var adminMailsArray = eventData.adminMails;
  //         var regisMailsArray = eventData.regisMails;
  //         var eventToEdit = doc(database, `event+/data/events`, data.id);

  //         if (userType == "Administrador") {
  //           adminMailsArray.push(userUid);
  //           await updateDoc(eventToEdit, {
  //             adminMails: adminMailsArray,
  //           });
  //           regisMailsArray.push(userUid);
  //           await updateDoc(eventToEdit, {
  //             regisMails: regisMailsArray,
  //           });
  //         } else if (userType == "Registrador" || userType == "StandStaff") {
  //           regisMailsArray.push(userUid);
  //           await updateDoc(eventToEdit, {
  //             regisMails: regisMailsArray,
  //           });
  //         }
  //       });
  //     });
  //   };

  //   const addTotalOfUsers = async (countOfUsers) => {
  //     const eventRef = collection(database, `event+/data/events`);
  //     const qEventToEdit = query(eventRef, where("eventId", "==", eventId));
  //     await getDocs(qEventToEdit).then(async (response) => {
  //       response.docs.map(async (data) => {
  //         var eventData = data.data();
  //         const eventToEdit = doc(database, `event+/data/events/${data.id}`);
  //         await updateDoc(eventToEdit, {
  //           totalPendingUsers:
  //             parseInt(eventData.totalPendingUsers) + countOfUsers,
  //         });
  //       });
  //     });
  //   };

  //   const addPersonalReward = (userUid, data2) => {
  //     const personaRewardRef = collection(
  //       database,
  //       `event+/data/personalRewards`
  //     );
  //     if (data2.hasOwnProperty("Recompensa_personal_1")) {
  //       addDoc(personaRewardRef, {
  //         reward: data2.Recompensa_personal_1,
  //         eventId: eventId
  //           ? eventId
  //           : JSON.parse(localStorage.getItem("eventIdMemory")),
  //         uid: userUid,
  //         complete: false,
  //       });
  //     }
  //     if (data2.hasOwnProperty("Recompensa_personal_2")) {
  //       addDoc(personaRewardRef, {
  //         reward: data2.Recompensa_personal_2,
  //         eventId: eventId
  //           ? eventId
  //           : JSON.parse(localStorage.getItem("eventIdMemory")),
  //         uid: userUid,
  //         complete: false,
  //       });
  //     }
  //     if (data2.hasOwnProperty("Recompensa_personal_3")) {
  //       addDoc(personaRewardRef, {
  //         reward: data2.Recompensa_personal_3,
  //         eventId: eventId
  //           ? eventId
  //           : JSON.parse(localStorage.getItem("eventIdMemory")),
  //         uid: userUid,
  //         complete: false,
  //       });
  //     }
  //     if (data2.hasOwnProperty("Recompensa_personal_4")) {
  //       addDoc(personaRewardRef, {
  //         reward: data2.Recompensa_personal_4,
  //         eventId: eventId
  //           ? eventId
  //           : JSON.parse(localStorage.getItem("eventIdMemory")),
  //         uid: userUid,
  //         complete: false,
  //       });
  //     }
  //   };

  //   function downloadFileBulkUpload() {
  //     var link = document.createElement("a");
  //     link.href =
  //       "https://firebasestorage.googleapis.com/v0/b/event-plus-5689d.appspot.com/o/bulkLoad%2FCarga%20Masiva%20v4.xlsx?alt=media&token=6882fe2e-27d7-4fee-8e4a-a788318b889d";
  //     link.download = "Carga Masiva.xlsx";
  //     link.dispatchEvent(new MouseEvent("click"));
  //   }
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
