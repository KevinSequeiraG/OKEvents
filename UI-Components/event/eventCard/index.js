import Link from "next/link";
import { useState } from "react";


const EventCard = () => {
    const [eventState, setEventState] = useState(1)
    const [data, setData] = useState({})

    return (
        <>
            <Link
                href={{
                    pathname: "/guestUsers",
                    query: data, // the data
                }}
                as="/guestUsers"
            >
                <div
                    className="rounded-[10px] relative w-[20rem] md:w-full flex flex-row md:max-w-[24rem] bg-gray-200"
                >
                    <div
                        className={`absolute top-0 left-0 px-2 py-0.5 rounded-tl-[9px] rounded-br-[12px]  ${eventState == 1
                            ? "bg-[#35CA75]"
                            : eventState == 2
                                ? "bg-[#101217]"
                                : eventState == 3
                                    ? "bg-[#899592]"
                                    : ""
                            }`}
                    >
                        <p className="text-white text-[12px] font-semibold tracking-normal leading-5">
                            {eventState == 1
                                ? "Iniciado"
                                : eventState == 2
                                    ? "Programado"
                                    : eventState == 3
                                        ? "Finalizado"
                                        : ""}
                        </p>
                    </div>
                    <img
                        className={`inline-block rounded-l-[10px] object-cover w-32 min-h-full min-w-[7.5rem] max-w-[7.5rem]`}
                        src={`${data?.eventImageUrl
                            ? data?.eventImageUrl
                            : "./Images/defaultEventPicture.png"
                            }`}
                        alt="Foto del evento"
                    />
                    <div className="px-2 py-3 flex flex-col justify-between w-full">
                        <p className="text-[10px] font-bold text-[#899592]">
                            Concierto
                            {/* {data?.eventType} */}
                        </p>
                        <h1 className="text-[13px] font-bold truncate mt-2 mb-1">
                            Kevin's Active
                            {/* {data?.name} */}
                        </h1>
                        <h3 className="text-[10px] text-[#899592]">
                            Inicia: 15/11/2022
                            {/* {`${new Date(parseInt(data?.startDate)).getDate()}/${new Date(parseInt(data?.startDate)).getMonth() + 1}/${new Date(parseInt(data?.startDate)).getFullYear()}`} */}
                        </h3>
                        <h3 className="text-[10px] text-[#899592]">
                            Termina: 16/11/2022
                            {/* {`${new Date(parseInt(data?.startDate)).getDate()}/${new Date(parseInt(data?.startDate)).getMonth() + 1}/${new Date(parseInt(data?.startDate)).getFullYear()}`} */}
                        </h3>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default EventCard;