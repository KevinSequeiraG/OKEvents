import Link from "next/link"
import { AddUserIcon, ScanQRIcon, SearchIcon, ShowQrIcon } from "../../../public/svgs/regisNavbar/icons"
import ShowQrModal from "../../Modals/Register/ShowQrModal"
import { useState } from "react"
import ScanQrModal from "../../Modals/Register/ScanQrModal"
import ShowUserInfoModal from "../../Modals/User/ShowUserInfoModal"

const RegisNavbar = (props) => {
    const [showQrModal, setShowQrModal] = useState(false)
    const [showScanQrModal, setShowScanQrModal] = useState(false)
    const [showUserInfoModal, setShowUserInfoModal] = useState(false)
    const [userSearched, setUserSearched] = useState()
    const [visitOfUserSearched, setVisitOfUserSearched] = useState()

    const handleScanner = () => {
        setShowScanQrModal(true)
    }

    const handleQr = () => {
        setShowQrModal(true)
    }

    return (
        <>
            <ShowQrModal data={props.eventData} showQrModal={showQrModal} setShowQrModal={setShowQrModal} />
            <ScanQrModal setUserSearched={setUserSearched} setVisitOfUserSearched={setVisitOfUserSearched} showScanQrModal={showScanQrModal} setShowScanQrModal={setShowScanQrModal} eventId={props.eventData.eventId} setShowUserInfoModal={setShowUserInfoModal} />
            {showUserInfoModal && <ShowUserInfoModal userSearched={userSearched} visitOfUserSearched={visitOfUserSearched} showUserInfoModal={showUserInfoModal} setShowUserInfoModal={setShowUserInfoModal} />}
            <div className="md:absolute md:w-6/12 left-0 h-[60px] bg-white w-full flex items-center justify-around border-t-2 fixed bottom-0 md:translate-x-[50%] md:transform md:border-t-0">
                <Link href={`/allUsers/[allUsers]`} as={`/allUsers/${props.eventData.eventId}`}>
                    <button>
                        <SearchIcon />
                    </button>
                </Link>
                <button
                    onClick={handleScanner}
                >
                    <ScanQRIcon />
                </button>
                <Link href={"/registration/[index]"} as={`/registration/${props.eventData.eventId}`}>
                    <button>
                        <AddUserIcon />
                    </button>
                </Link>
                <button
                    onClick={handleQr}
                >
                    <ShowQrIcon />
                </button>
            </div>
        </>
    )
}

export default RegisNavbar