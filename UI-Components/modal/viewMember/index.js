

import { getUserByUid } from "@/DAO/users";
import { XCloseIcon } from "@/public/svgs/Icons";
import { useEffect, useState } from "react";

const ViewMember = (props) => {
    const [userData, setUserData] = useState()
    const [hourArrived, setHourArrived] = useState("")

    useEffect(() => {
        getUserByUid(props.memberData.registeredBy).then((user) => {
            setUserData(user)
        })


        // Combina los valores de nanosegundos y segundos en milisegundos
        const milliseconds = props.memberData.arrivalDate.seconds * 1000 + props.memberData.arrivalDate.nanoseconds / 1000000;

        // Crea un objeto Date usando los milisegundos
        const arrivalDate = new Date(milliseconds);


        const hours = arrivalDate.getHours();
        const minutes = arrivalDate.getMinutes();
        const seconds = arrivalDate.getSeconds();

        setHourArrived(hours + ":" + minutes)
    }, [])



    return (
        <>
            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[51] ${props.showViewMember ? '' : 'hidden'}`}>
                <div className="px-5 py-5 w-auto h-auto bg-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl">
                    {/* <div className="absolute right-4 cursor-pointer" onClick={() => props.setShowAddUsersModal(false)}><XCloseIcon /></div> */}
                    <p className="text-center font-bold text-[1.4rem]">Miembro de evento</p>
                    <div className="mt-4 text-center">
                        <p className="mb-2"><span className="font-bold">Nombre:</span> {props.memberData.name.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
                            letra.toUpperCase()
                        )}</p>
                        <p className="mb-2"><span className="font-bold">Correo electrónico:</span> {props.memberData.email}</p>
                        <p className="mb-2"><span className="font-bold">Cédula:</span> {props.memberData.identification}</p>
                        <p className="mb-2"><span className="font-bold">ID de miembro:</span> {props.memberData.memberID}</p>
                        <p className="mb-2"><span className="font-bold">Teléfono:</span> {props.memberData.phoneNumber}</p>
                        <p className="mb-2"><span className="font-bold">Registrado por: </span>{userData && userData.name}</p>
                        <p><span className="font-bold">Hora de ingreso: </span>{hourArrived}</p>
                    </div>
                    <div className="w-full flex justify-center">
                        <button onClick={() => props.setShowViewMember(false)} className="bg-[#426CB4] text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-[#204585]">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewMember;