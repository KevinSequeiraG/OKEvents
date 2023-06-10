import { Tooltip } from "@material-tailwind/react";
import { useUserAuth } from "@/BAO/userAuthContext";

export default function SearchInput({
  usersPage,
  adminInputFilter,
  setAdminInputFilter,
  searchPlaceholder
}) {

  const { loggedUser, isAdmin } = useUserAuth();

  return (
    <>
      <div className="w-[400px] mx-auto">
        <div className="relative w-full flex">
          <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none h-[40px] sm:h-auto md:max-w-[450px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17.971 17.971"
            >
              <path
                id="Icon_map-search"
                d="M14.59,12.2A7.107,7.107,0,1,0,12.2,14.59l4.822,4.822,2.391-2.393Zm-6.059.719a4.384,4.384,0,1,1,4.387-4.382,4.392,4.392,0,0,1-4.387,4.382Z"
                transform="translate(-1.44 -1.44)"
                fill="#899592"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="w-full md:w-[400px] bg-white pl-11 border border-[#8B9592] rounded-[10px] h-[40px] md:h-[38px] pr-4 text-[14px] md:text-[16px] text-[#899592] focus:text-black mb-5 sm:mb-0"
            placeholder={searchPlaceholder}
            onChange={(event) => setAdminInputFilter(event.target.value)}
            value={adminInputFilter}
          />
          {!usersPage ? (
            <Tooltip
              placement="top"
              className="bg-gray-600 text-center text-white text-[13px] tracking-wide"
              content={"Categorías"}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("show-filter"));
                }}
                className="ml-2 bg-black h-[40px] md:h-[36px] rounded-lg md:hover:bg-gray-900 md:hover:shadow-md md:flex md:items-center md:space-x-3 w-[40px]"
              >
                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="18.612" height="16.31" viewBox="0 0 18.612 16.31">
                  <g id="Ico_filtrar" transform="translate(1)">
                    <line id="Línea_31" data-name="Línea 31" x2="16.612" transform="translate(0 2.769)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                    <g id="Elipse_14" data-name="Elipse 14" transform="translate(8.921)" fill="#101217" stroke="#fff" strokeWidth="2">
                      <circle cx="2.769" cy="2.769" r="2.769" stroke="none" />
                      <circle cx="2.769" cy="2.769" r="1.769" fill="none" />
                    </g>
                    <line id="Línea_32" data-name="Línea 32" x2="16.612" transform="translate(0 8.155)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                    <g id="Elipse_15" data-name="Elipse 15" transform="translate(2.769 5.386)" fill="#101217" stroke="#fff" strokeWidth="2">
                      <circle cx="2.769" cy="2.769" r="2.769" stroke="none" />
                      <circle cx="2.769" cy="2.769" r="1.769" fill="none" />
                    </g>
                    <line id="Línea_33" data-name="Línea 33" x2="16.612" transform="translate(0 13.542)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                    <g id="Elipse_16" data-name="Elipse 16" transform="translate(11.075 10.773)" fill="#101217" stroke="#fff" strokeWidth="2">
                      <circle cx="2.769" cy="2.769" r="2.769" stroke="none" />
                      <circle cx="2.769" cy="2.769" r="1.769" fill="none" />
                    </g>
                  </g>
                </svg>
              </button>
            </Tooltip>
          ) : null}
        </div>
      </div>
    </>
  );
}
