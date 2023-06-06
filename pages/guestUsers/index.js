import { getEventById, handleEventState } from "@/DAO/event";
import AddUsersModal from "@/UI-Components/modal/addUsersModal";
import { EditIcon } from "@/public/svgs/Icons";
import { useEffect, useState } from "react";

const GuestUsers = () => {
    const [data, setData] = useState({})
    const [eventId, setEventId] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [showAddUsersModal, setShowAddUsersModal] = useState(false)

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
        getEventById("436285").then((response) => {
            if (response.length > 0) {
                setData(response[0]);
                setEventId(response[0].eventId);
                console.log(data);
                setStartDate(formatDate(response[0].startDate))
                setEndDate(formatDate(response[0].endDate))
                setIsOpen(response[0].isOpen)
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (<div>
        {data != undefined ? (
            <div>
                <img
                    className="object-cover md:h-64 w-full"
                    src={`${data?.eventImageUrl
                        ? data?.eventImageUrl
                        : "../Images/defaultEventPicture.png"
                        }`}
                    alt="Foto de perfil"
                />
                <div className="w-full p-6 bg-gray-100 relative">
                    <p className="font-bold text-[14px] tracking-normal leading-4 text-[#899592]">
                        {data?.eventType}
                    </p>
                    <p className="font-bold text-[18px] sm:text-[24px] tracking-normal leading-7 text-black mt-1 sm:my-1">
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
                            <p className="font-bold text-[12px] tracking-normal leading-4 text-[#101217] mb-1">
                                Fecha de inicio
                            </p>
                            <div className="flex text-[16px] tracking-normal leading-5 text-[#899592] items-center">
                                {startDate}
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-[12px] tracking-normal leading-4 text-[#101217] mb-1">
                                Fecha de finalización
                            </p>
                            <div className="flex text-[16px] tracking-normal leading-5 text-[#899592] items-center">
                                {endDate}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowAddUsersModal(true)} className="bg-[#426CB4] text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-[#204585]">Agregar usuarios</button>
                    <button onClick={() => { handleEventState("436285", !isOpen); setIsOpen(!isOpen) }} className="ml-8 bg-gray-600 text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-gray-700">{isOpen ? "Cerrar" : "Abrir"} mesa</button>
                    <button className="ml-8 bg-red-800 text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-red-700">Eliminar evento</button>
                    <button className="absolute top-[0%] right-10 ml-8 bg-gray-400 text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-gray-500"><EditIcon /></button>
                </div>
            </div>
        ) : null}
        <div>
            <p className="text-center font-bold text-[1.6rem] mt-20">Miembros de evento</p>
        </div>
        <AddUsersModal showAddUsersModal={showAddUsersModal} setShowAddUsersModal={setShowAddUsersModal} />
    </div>)
}

export default GuestUsers;