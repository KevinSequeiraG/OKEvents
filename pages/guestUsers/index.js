import { getEventById, handleEventState } from "@/DAO/event";
import AddUsersModal from "@/UI-Components/modal/addUsersModal";
import GuestUserCard from "@/UI-Components/user/guestUserCard/guestUserCard";
import { EditIcon } from "@/public/svgs/Icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingAnimation from "@/UI-Components/layout/loadingAnimation";
import { useUserAuth } from "../../BAO/userAuthContext";
import { getMembersByEventId } from "@/DAO/members";
import SearchInput from "@/UI-Components/layout/searchInput";
import Link from "next/link";
import DeleteEventModal from "@/UI-Components/modal/deleteEvent";

const GuestUsers = () => {
  const [usersData, setUsersData] = useState([])
  const router = useRouter();
  const [data, setData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [eventId, setEventId] = useState();
  const [startDate, setStartDate] = useState();
  const [adminInputFilter, setAdminInputFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const { loggedUserUid } = useUserAuth();

  function formatDate(timestamp) {
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript se indexan desde 0
    const year = date.getFullYear();

    // Agrega ceros iniciales si es necesario
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  useEffect(() => {
    setIsLoadingData(true);
    getEventById(
      router?.query?.eventId
        ? router.query.eventId
        : JSON.parse(localStorage.getItem("savedEventId"))
    )
      .then((response) => {
        if (response.length > 0) {
          setData(response[0]);
          setEventId(response[0].eventId);
          console.log(data);
          setStartDate(formatDate(response[0].startDate));
          // setEndDate(formatDate(response[0].endDate))
          setIsOpen(response[0].isOpen);
          router?.query?.eventId &&
            localStorage.setItem(
              "savedEventId",
              JSON.stringify(router.query.eventId)
            );
          setIsLoadingData(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [updateMemberList, setUpdateMemberList] = useState(false);
  useEffect(() => {
    if (eventId != undefined) {
      getMembersByEventId(eventId).then((members) => {
        setUsersData(members)
      })
        .catch((error) => {
          console.error("Ocurrió un error al obtener los miembros:", error);
        });
    }
  }, [eventId, updateMemberList])

  useEffect(() => {
    const filteredData = usersData.filter(
      (user) =>
        user.identification.includes(adminInputFilter) ||
        user.memberID.includes(adminInputFilter)
    );

    if (adminInputFilter == '') {
      console.log("adsfa");
      getMembersByEventId(eventId).then((members) => {
        setUsersData(members)
      }
      ).catch((error) => {
        console.error("Ocurrió un error al obtener los miembros:", error);
      }
      );
    }

    setUsersData(filteredData);
  }, [adminInputFilter])


  return (
    <div>
      {data != undefined && !isLoadingData ? (
        <div>
          <img
            className="object-cover md:h-64 w-full"
            src={`${
              data?.imageUrl
                ? data?.imageUrl
                : "../Images/defaultEventPicture.png"
            }`}
            alt="Foto de perfil"
          />
          <div className="w-full p-6 bg-gray-100 relative">
            <p className="font-bold text-[14px] tracking-normal leading-4 text-[#899592]">
              {data?.eventType}
            </p>
            <p className="font-bold text-[18px] sm:text-[24px] tracking-normal leading-7 text-black mt-1 sm:my-2">
              {data?.name}
            </p>
            <p className="mb-4 font-medium text-[18px] tracking-normal leading-5 text-[#35CA75]">
              ID #{eventId}
            </p>
            <p className="tracking-normal leading-5 text-[12px] sm:text-[16px] text-[#8D8D8D] mt-0 sm:mt-3 mb-4">
              {data?.description}
            </p>
            <div className="flex flex-row justify-between md:justify-start sm:flex-col 2xl:flex-row mb-4">
              <div className="mr-0 mb-3 2xl:mb-0 2xl:mr-5 ">
                <p className="font-bold text-[12px] sm:text-[14px] tracking-normal leading-4 text-[#101217] mb-1">
                  Fecha de inicio
                </p>
                <div className="flex text-[16px] tracking-normal leading-5 text-[#899592] items-center">
                  {startDate}
                </div>
              </div>
              {/* <div>
                            <p className="font-bold text-[12px] tracking-normal leading-4 text-[#101217] mb-1">
                                Fecha de finalización
                            </p>
                            <div className="flex text-[16px] tracking-normal leading-5 text-[#899592] items-center">
                                {endDate}
                            </div>
                        </div> */}
            </div>
            <div className="w-full space-x-0 sm:space-x-4">
              <button
                onClick={() => setShowAddUsersModal(true)}
                className="bg-[#426CB4] text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-[#204585] w-full sm:w-fit"
              >
                Agregar usuarios
              </button>
              <button
                onClick={() => {
                  handleEventState("948475", loggedUserUid);
                  setIsOpen(!isOpen);
                }}
                className=" bg-gray-600 text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-gray-700 w-full sm:w-fit"
              >
                {isOpen ? "Cerrar" : "Abrir"} mesa
              </button>
              <button onClick={() => setShowDeleteEventModal(true)} className=" bg-red-800 text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-red-700 w-full sm:w-fit">
                Eliminar evento
              </button>
            </div>
            <Link
              href={{
                pathname: "/editEvent",
                query: {eventId: eventId},
              }}
              as={"/editEvent"}
            >
              <button className="absolute top-[0%] right-3 sm:right-10 ml-8 bg-gray-400 text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-gray-500">
                <EditIcon />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <LoadingAnimation />
      )}
      <div>
        <div className="w-1/2 mx-auto mt-10">
          <SearchInput
            searchPlaceholder="Buscar miembro por cédula o número de miembro"
            usersPage
            adminInputFilter={adminInputFilter}
            setAdminInputFilter={setAdminInputFilter}
          />
        </div>
        <p className="text-center font-bold text-[1.6rem] mt-10 mb-10">Miembros de evento</p>
        <p className="text-center font-bold text-[1.6rem] mt-20 mb-10">
          Miembros de evento
        </p>
        {usersData.map((user, i) => {
          return (
            <GuestUserCard
              imageProfileUrl={user.imageUrl}
              key={i}
              userName={user.name}
              userDNI={user.identification}
              activeUser={user.present}
              user={user}
              loggedUserUid={loggedUserUid}
            />)
        })}
      </div>
      <AddUsersModal
        showAddUsersModal={showAddUsersModal}
        setShowAddUsersModal={setShowAddUsersModal}
        eventId={eventId}
        setUpdateMemberList={setUpdateMemberList}
        updateMemberList={updateMemberList}
      />
      <DeleteEventModal
        showAddUsersModal={showDeleteEventModal}
        setShowAddUsersModal={setShowDeleteEventModal}
        eventId={data.id}
      />
    </div>
  );
};

export default GuestUsers;
