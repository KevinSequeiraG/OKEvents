import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HamburguerIcon,
  LogOutIcon,
  TicketsIcon,
  UserIcon,
} from "../../../public/svgs/Icons";
import NavElement from "./NavElement";
import {
  CalendarIcon,
  RolesIcon,
  UserNavIcon,
} from "../../../public/svgs/navbar/icons";
// import ChangeRolModal from "../../Modals/ChangeRolModal";
import { useUserAuth } from "@/BAO/userAuthContext";
import LoadingAnimation from "../loadingAnimation";

const Navbar = ({ children }) => {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(false);
  const isLoginPage = router.pathname == "/login";
  const isRegisterPage = router.pathname == "/newAccount";
  const isPreLoginPage = router.pathname === "/";
  const isVerifyEmail = router.pathname === "/verifyEmail";
  const isEditRegistration = router.pathname === "/editRegistration";
  const isActiveUsers = router.pathname.includes("/activeUsers");
  const { loggedUser, isAdmin } = useUserAuth();
  const [showIconLogo, setShowIconLogo] = useState(true);
  const [showChangeRolModal, setShowChangeRolModal] = useState(false);

  return (
    <>
      {/* Si no tiene un usuario loggeado, aparece una animación */}
      <title>{`OKEvents`}</title>
      <meta property="og:title" content={`Event+`} key="title" />
      {/* <link rel="shortcut icon" href={"/navbarLogoIco.ico"} /> */}
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      {!loggedUser && router.route != "/" && <LoadingAnimation />}
      {/* {showChangeRolModal && <ChangeRolModal showChangeRolModal={showChangeRolModal} setShowChangeRolModal={setShowChangeRolModal} />} */}
      {isLoginPage ||
      isPreLoginPage ||
      isRegisterPage ||
      isVerifyEmail ||
      isActiveUsers ||
      isEditRegistration ? (
        <div className="md:pt-0 w-full overflow-hidden h-screen">
          {children}
        </div>
      ) : (
        <div className="h-screen w-full relative overflow-hidden font-Inter flex flex-col lg:flex-row">
          {/* Mobile */}
          <div className="block md:hidden z-[51]">
            <div
              id="navbar"
              className="bg-[#101217] w-full h-16 items-center flex z-50 justify-end px-6 font-Inter absolute"
            >
              <Link href={"/eventsList"}>
                <img
                  alt="EventPlus Logo"
                  src="../Images/logo1.png"
                  className="w-[5rem] absolute left-0 top-[0rem]"
                ></img>
              </Link>
              <Link
                href={"/eventsList"}
                onClick={() => {
                  setShowNavbar(false);
                }}
              >
                <TicketsIcon />
              </Link>
              <button
                onClick={() => {
                  setShowNavbar(!showNavbar);
                }}
              >
                <HamburguerIcon />
              </button>
            </div>
            {showNavbar && (
              <div className="absolute top-[3.6rem]">
                <Link
                  href={"/myAccount"}
                  onClick={() => {
                    setShowNavbar(false);
                  }}
                >
                  <div className="bg-[#101217] w-screen py-2 px-5 border-t-[1px] flex items-center">
                    <UserIcon color="#fff" />
                    <button className="ml-2 text-white">Mi cuenta</button>
                  </div>
                </Link>
                <Link
                  href={"/"}
                  onClick={() => {
                    setShowNavbar(false);
                  }}
                >
                  <div className="bg-[#101217] w-screen py-2 px-5 border-y-[1px] flex items-center">
                    <LogOutIcon color="#fff" />
                    <button className="ml-2 text-white">Cerrar sesión</button>
                  </div>
                </Link>
              </div>
            )}
          </div>
          {/* Desktop */}
          <div className="hidden md:block absolute top-0 left-0 h-full min-h-[10rem] rounded-tr-xl rounded-br-xl bg-[#101217] text-[#899592] z-[51]">
            <nav
              onMouseEnter={() => {
                setShowIconLogo(false);
              }}
              onMouseLeave={() => {
                setShowIconLogo(true);
              }}
              className="lg:flex h-full flex-col lg:items-center justify-top relative round rounded-tr-lg rounded-br-lg lg:rounded-[0px_20px_20px_0px] z-50 space-y-5 navBarAnimation"
            >
              <div className="h-14 w-5 fill-[#899592] flex items-center justify-center rounded-[19px] cursor-pointer lg:mr-auto px-1 w-auto min-w-[2.5rem] profileElement ml-1">
                {loggedUser?.imageUrl ? (
                  <img
                    src={`${loggedUser.imageUrl}`}
                    alt="Foto de perfil"
                    className="z-50 sm:ml-0 inline-block min-h-16 w-16 lg:w-10 lg:h-10 lg:min-w-10 lg:min-h-10 lg:max-h-10 lg:max-w-10 rounded-full cursor-pointer hover:lg:shadow-lg object-cover"
                  />
                ) : (
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/okevents-f3a50.appspot.com/o/docs%2FuserDefaultProfileImageBlue.png?alt=media&token=495139da-1ca2-44b2-b4ad-c3fa1b9bf1b6`}
                    alt="Foto de perfil"
                    className="z-50 sm:ml-0 inline-block min-h-16 w-16 lg:w-10 lg:h-10 lg:min-w-10 lg:min-h-10 lg:max-h-10 lg:max-w-10 rounded-full cursor-pointer hover:lg:shadow-lg object-cover"
                  />
                )}
                <div className="w-full test text-left truncate">
                  <p className="font-Inter text-[12px] font-semibold tracking-normal leading-5 mb-1 truncate min-w-min">
                    {loggedUser?.name?.replace(
                      /(^\w{1})|(\s+\w{1})/g,
                      (letra) => letra.toUpperCase()
                    )}
                  </p>
                  <div
                    className={`font-Inter text-[12px] bg-gray-200 text-black rounded-[5px] text-center text-white font-semibold  flex items-center justify-center w-min`}
                  >
                    <p className="px-2 text-[9px] text-black">Registrador</p>
                  </div>
                </div>
              </div>
              <NavElement
                action={() => {
                  setShowChangeRolModal(false);
                }}
                goTo="home"
                active={router.pathname == "/home"}
                icon={<CalendarIcon router={router} />}
                elementName="Eventos"
              />
              <NavElement
                action={() => {
                  setShowChangeRolModal(false);
                }}
                goTo="myAccount"
                active={router.pathname == "/myAccount"}
                icon={<UserIcon color={"#899592"} />}
                elementName="Mi cuenta"
              />
              <NavElement
                action={() => {
                  setShowChangeRolModal(true);
                }}
                active={router.pathname == "/"}
                icon={<RolesIcon />}
                elementName="Roles"
              />
              <NavElement
                action={() => {
                  setShowChangeRolModal(false);
                }}
                goTo="/"
                active={router.pathname == "/"}
                icon={<LogOutIcon color={"#899592"} />}
                elementName="Cerrar sesión"
              />
              <img src="/Images/logo1.png" className="absolute bottom-6" />
            </nav>
          </div>
          <div
            className={`pt-16 md:pt-0 md:ml-16 md:w-full mx-auto scrollbar overflow-auto`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
