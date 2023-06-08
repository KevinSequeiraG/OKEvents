
import RegisterUserInEvent from "@/UI-Components/layout/modals/registerUserInEvent";
import { XCloseIcon } from "@/public/svgs/Icons";
import { useState } from "react";

const AddUsersModal = (props) => {
    const [showAddUsersModal, setShowAddUsersModal] = useState(false);
    return (
        <>        
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[51] ${props.showAddUsersModal ? '' : 'hidden'}`}>
            <div className="px-5 py-5 w-[27rem] h-auto bg-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl">
                <div className="absolute right-4 cursor-pointer" onClick={()=>props.setShowAddUsersModal(false)}><XCloseIcon /></div>
                <p className="text-center font-bold text-[1.4rem]">Agregar nuevos usuarios</p>
                <div className="flex justify-between mt-5">
                    <button className="bg-[#426CB4] text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-[#204585]">Carga masiva</button>
                    <button className="bg-gray-600 text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-gray-700" onClick={()=>{setShowAddUsersModal(true); props.setShowAddUsersModal(false)}}>Único usuario</button>
                </div>
            </div>
        </div>
        {showAddUsersModal && (
        <RegisterUserInEvent setRegisterUserModal={setShowAddUsersModal} isNotFromAutoRegis/>
      )}
        </>
    )
}

export default AddUsersModal;