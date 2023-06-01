import React from "react";

export default function RegisterUser() {
    const handleRegistration = async () => {
        // Acá va la lógica para loggear al usuario
        setLoginError(false);
        await logIn(userEmail, userPassword)
          .then(async (userCredential) => {
            if (rememberMeChecked) {
              localStorage.setItem("rememberMe", JSON.stringify(rememberMeChecked));
              localStorage.setItem("rememberMeEmail", JSON.stringify(userEmail));
            } else {
              localStorage.removeItem("rememberMe");
              localStorage.removeItem("rememberMeEmail");
            }
            router.push("/home");
          })
          .catch((error) => {
            console.log("Error de login", error);
            setLoginError(true);
          });
      };
    
  return (
    <>
      <div className="mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none max-w-5xl max-h-fit my-auto">
        <div className="relative inset-0 mx-auto w-full">
          <div className="flex items-center justify-center min-h-full text-center">
            <div className="relative bg-white rounded-[10px] text-left overflow-hidden shadow-xl transform transition-all max-w-5xl w-full">
              <div className="bg-white">
                <div className="flex items-center px-10 py-5">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="30"
                      viewBox="0 0 31.5 36"
                    >
                      <path
                        id="Icon_awesome-user"
                        data-name="Icon awesome-user"
                        d="M15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.3,2.25H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V29.7A9.452,9.452,0,0,0,22.05,20.25Z"
                        fill="#35ca75"
                      />
                    </svg>
                  </div>
                  <div className="ml-1 text-left">
                    <h1 className="text-[22px] font-bold tracking-normal leading-5 text-black text-center md:text-left w-full">
                      Crear usuario
                    </h1>
                  </div>
                </div>
                <div className="px-10 max-h-[30rem] 2xl:max-h-[35rem] scrollbar overflow-y-auto">
                  <h2 className="font-bold tracking-normal leading-10 text-[25px] text-[black] mt-2 mb-6 hidden md:block">
                    Información básica
                  </h2>
                  <div className="">
                    <div className="h-24 md:h-44 w-24 md:w-44 mt-6 md:mt-0">
                      <label
                        className={
                          "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                        }
                      >
                        Foto de perfil
                      </label>
                      <div className="flex items-center">
                        {/* <ImageUplaod
                          profilePicture
                          containerClassName={
                            "flex justify-center items-center h-24 md:h-44 w-24 md:w-44 bg-[#F3F4F5] rounded-full cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-200 border border-[#8B9592]"
                          }
                          setImageValue={setImageProfile}
                          setImageUrl={setImageProfileUrl}
                          imageUrl={imageProfileUrl}
                        /> */}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-1 w-full mt-12">
                      <div className="col-span-1">
                        {/* Campo basico */}
                        <Input
                          requiredInput
                          labelClassName={
                            "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                          }
                          inputClassName={
                            "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-2 text-[16px] text-[#899592] focus:text-black"
                          }
                          labelTitle={"Nombre"}
                          setInputValue={setName}
                          inputValue={name}
                          inputError={nameError}
                          inputErrorMessage={""}
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        {" "}
                        {/* Campo basico */}
                        <Input
                          requiredInput
                          labelClassName={
                            "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                          }
                          inputClassName={
                            "w-full bg-[#E9E9EB] border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                          }
                          labelTitle={"Apellidos"}
                          setInputValue={setLastName}
                          inputValue={lastName}
                          inputError={lastNameError}
                          inputErrorMessage={""}
                        />
                      </div>

                      <div className="col-span-1">
                        {/* Campo basico */}
                        <Input
                          requiredInput
                          labelClassName={
                            "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                          }
                          inputClassName={
                            "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                          }
                          labelTitle={"Cédula de identidad"}
                          setInputValue={setIdentification}
                          inputValue={identification}
                          inputError={idError}
                          inputErrorMessage={"Formato invalido"}
                          inputDisabled={isEdit}
                        />
                      </div>

                      <div className="col-span-1">
                        {/* Campo basico */}
                        <Input
                          requiredInput
                          labelClassName={
                            "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                          }
                          inputClassName={
                            "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                          }
                          labelTitle={"Correo electrónico principal"}
                          placeholderText={"ejemplo@ejemplo.com"}
                          inputPrincipalEmail
                          setInputValue={setMainEmail}
                          inputValue={mainEmail}
                          inputError={mainEmailError}
                          inputErrorMessage={"Formato de correo incorrecto"}
                          inputDisabled={isEdit}
                        />
                      </div>

                      {!generalUsersView ? (
                        <div className="col-span-1">
                          {/* Campo basico */}
                          <DropDown
                            requiredInput
                            labelTitle={"Tipo de usuario"}
                            listUsersType
                            setDropDownData={setUserType}
                            listValues={listUsersType}
                            inputError={userTypeError}
                            dropDownValue={
                              openModalCreateStandStaff
                                ? "StandStaff"
                                : userType
                            }
                            inputDisabled={openModalCreateStandStaff}
                          />
                        </div>
                      ) : null}
                      {showPasswordInput && !isEdit ? (
                        <>
                          <div className="col-span-1">
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              inputErrorMessage={
                                "Contraseña debe tener 8 caracteres"
                              }
                              labelTitle={"Contraseña"}
                              inputTypePassword
                              setInputValue={setPassword}
                              inputValue={password}
                              inputError={passwordError}
                            />
                          </div>
                          <div className="col-span-1">
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"Confirmar contraseña"}
                              inputTypePassword
                              setInputValue={setConfirmPassword}
                              inputValue={confirmPassword}
                              inputError={confirmPasswordError}
                              inputErrorMessage={"Las contraseñas no coinciden"}
                            />
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div
                      id="opcionales"
                      className={`${
                        showOptionals || generalUsersView ? "block" : "hidden"
                      }`}
                    >
                      <h2 className="font-bold tracking-normal leading-10 text-[25px] text-[black] mt-4">
                        Información opcionales
                      </h2>

                      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  gap-x-9">
                        {fieldValue("optionalPersonalEmail") ||
                        generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"Correo personal"}
                              placeholderText={"ejemplo@ejemplo.com"}
                              setInputValue={setPersonalEmail}
                              inputValue={personalEmail}
                              inputError={personalEmailError}
                              inputErrorMessage={"Formato de correo incorrecto"}
                            />
                          </div>
                        ) : null}

                        {fieldValue("optionalAlternativeEmail") ||
                        generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"Correo alternativo"}
                              placeholderText={"ejemplo@ejemplo.com"}
                              setInputValue={setAlternateEmail}
                              inputValue={alternateEmail}
                              inputError={alternateEmailError}
                              inputErrorMessage={"Formato de correo incorrecto"}
                            />
                          </div>
                        ) : null}

                        {showAccessDropDown &&
                        !generalUsersView &&
                        fieldValue("optionalAccess") ? (
                          <div className={`col-span-1 `}>
                            <DropDown
                              //requiredInput
                              labelTitle={"Acceso"}
                              listUsersType
                              setDropDownData={setAccess}
                              listValues={listAccess}
                              inputError={accessError}
                              inputErrorMessage={"Formato de correo incorrecto"}
                              dropDownValue={access}
                            />
                          </div>
                        ) : null}

                        {fieldValue("optionalCompany") || generalUsersView ? (
                          <div className={`col-span-1`}>
                            <Input
                              //requiredInput
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"Empresa"}
                              setInputValue={setCompany}
                              inputValue={company}
                              inputError={companyError}
                              inputErrorMessage={""}
                            />
                          </div>
                        ) : null}

                        {fieldValue("optionalLanguage") || generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <DropDown
                              //requiredInput
                              labelTitle={"Idioma"}
                              listLanguage
                              setDropDownData={setLanguage}
                              listValues={listLanguage}
                              inputError={languageError}
                              inputErrorMessage={"Formato de correo incorrecto"}
                              dropDownValue={language}
                            />
                          </div>
                        ) : null}
                        {fieldValue("optionalVehicleId") || generalUsersView ? (
                          !generalUsersView ? (
                            <div className={`col-span-1 `}>
                              <Input
                                labelClassName={
                                  "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                                }
                                inputClassName={
                                  "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                                }
                                labelTitle={"Placa vehicular"}
                                setInputValue={setVehicleNumber}
                                inputValue={vehicleNumber}
                              />
                            </div>
                          ) : null
                        ) : null}

                        {fieldValue("optionalFoodAllergy") ||
                        generalUsersView ? (
                          !generalUsersView ? (
                            <div className={`col-span-1 `}>
                              <Input
                                labelClassName={
                                  "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                                }
                                inputClassName={
                                  "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                                }
                                labelTitle={"Alergia alimenticia"}
                                setInputValue={setFoodtAllergy}
                                inputValue={foodtAllergy}
                              />
                            </div>
                          ) : null
                        ) : null}

                        {fieldValue("optionalCountry") || generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <DropDown
                              //requiredInput
                              labelTitle={"País"}
                              listUsersType
                              setDropDownData={setNirPhone}
                              listValues={listCountriesNir}
                              inputError={nirPhoneError}
                              dropDownValue={nirPhone}
                            />
                          </div>
                        ) : null}

                        {fieldValue("optionalPhone") || generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <div>
                              <Input
                                //requiredInput
                                labelClassName={
                                  "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                                }
                                inputClassName={
                                  "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                                }
                                labelTitle={"Teléfono"}
                                placeholderText={"Eje: 88872425"}
                                setInputValue={setPhone}
                                inputValue={phone}
                                inputError={phoneError}
                                inputErrorMessage={""}
                              />
                            </div>
                          </div>
                        ) : null}

                        {fieldValue("optionalEmployeeNumber") ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"N° empleado"}
                              setInputValue={setEmployeeNumber}
                              inputValue={employeeNumber}
                              inputError={employeeNumberError}
                              inputErrorMessage={"Formato incorrecto"}
                            />
                          </div>
                        ) : null}

                        {fieldValue("optionalCollegiateNumber") ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"N° colegiado"}
                              setInputValue={setCollegiateNumber}
                              inputValue={collegiateNumber}
                              inputError={collegiateNumberError}
                              inputErrorMessage={"Formato incorrecto"}
                            />
                          </div>
                        ) : null}

                        {fieldValue("optionalPartnerNumber") ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"N° socio"}
                              setInputValue={setPartnerNumber}
                              inputValue={partnerNumber}
                              inputError={partnerNumberError}
                              inputErrorMessage={"Formato incorrecto"}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div
                      id="deseados"
                      className={`${
                        showDesired || generalUsersView ? "block" : "hidden"
                      }`}
                    >
                      <h2 className="font-bold tracking-normal leading-10 text-[25px] text-[black] mt-4">
                        Información deseadas
                      </h2>

                      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-x-9">
                        {fieldValue("desiredPersonalEmail") ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"Correo personal"}
                              placeholderText={"ejemplo@ejemplo.com"}
                              setInputValue={setPersonalEmail}
                              inputValue={personalEmail}
                              inputError={personalEmailError}
                              inputErrorMessage={"Formato de correo incorrecto"}
                            />
                          </div>
                        ) : null}

                        {fieldValue("desiredAlternativeEmail") ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"Correo alternativo"}
                              placeholderText={"ejemplo@ejemplo.com"}
                              setInputValue={setAlternateEmail}
                              inputValue={alternateEmail}
                              inputError={alternateEmailError}
                              inputErrorMessage={"Formato de correo incorrecto"}
                            />
                          </div>
                        ) : null}

                        {fieldValue("desiredAccess") ? (
                          showAccessDropDown && !generalUsersView ? (
                            <div className={`col-span-1 `}>
                              <DropDown
                                //requiredInput
                                labelTitle={"Acceso"}
                                listUsersType
                                setDropDownData={setAccess}
                                listValues={listAccess}
                                inputError={accessError}
                                inputErrorMessage={
                                  "Formato de correo incorrecto"
                                }
                                dropDownValue={access}
                              />
                            </div>
                          ) : null
                        ) : null}

                        {fieldValue("desiredCompany") ? (
                          <div className={`col-span-1`}>
                            <Input
                              //requiredInput
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"Empresa"}
                              setInputValue={setCompany}
                              inputValue={company}
                              inputError={companyError}
                              inputErrorMessage={""}
                            />
                          </div>
                        ) : null}

                        {fieldValue("desiredLanguage") ? (
                          <div className={`col-span-1 `}>
                            <DropDown
                              //requiredInput
                              labelTitle={"Idioma"}
                              listLanguage
                              setDropDownData={setLanguage}
                              listValues={listLanguage}
                              inputError={languageError}
                              inputErrorMessage={"Formato de correo incorrecto"}
                              dropDownValue={language}
                            />
                          </div>
                        ) : null}
                        {fieldValue("desiredVehicleId") ? (
                          !generalUsersView ? (
                            <div className={`col-span-1 `}>
                              <Input
                                labelClassName={
                                  "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                                }
                                inputClassName={
                                  "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                                }
                                labelTitle={"Placa vehicular"}
                                setInputValue={setVehicleNumber}
                                inputValue={vehicleNumber}
                              />
                            </div>
                          ) : null
                        ) : null}

                        {fieldValue("desiredFoodAllergy") ? (
                          !generalUsersView ? (
                            <div className={`col-span-1 `}>
                              <Input
                                labelClassName={
                                  "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                                }
                                inputClassName={
                                  "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                                }
                                labelTitle={"Alergia alimenticia"}
                                setInputValue={setFoodtAllergy}
                                inputValue={foodtAllergy}
                              />
                            </div>
                          ) : null
                        ) : null}

                        {fieldValue("desiredCountry") ? (
                          <div className={`col-span-1 `}>
                            <DropDown
                              //requiredInput
                              labelTitle={"País"}
                              listUsersType
                              setDropDownData={setNirPhone}
                              listValues={listCountriesNir}
                              inputError={nirPhoneError}
                              dropDownValue={nirPhone}
                            />
                          </div>
                        ) : null}

                        {fieldValue("desiredPhone") ? (
                          <div className={`col-span-1 `}>
                            <div>
                              <Input
                                //requiredInput
                                labelClassName={
                                  "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                                }
                                inputClassName={
                                  "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                                }
                                labelTitle={"Teléfono"}
                                placeholderText={"Eje: 88872425"}
                                setInputValue={setPhone}
                                inputValue={phone}
                                inputError={phoneError}
                                inputErrorMessage={""}
                              />
                            </div>
                          </div>
                        ) : null}

                        {fieldValue("desiredEmployeeNumber") ||
                        generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"N° empleado"}
                              setInputValue={setEmployeeNumber}
                              inputValue={employeeNumber}
                              inputError={employeeNumberError}
                              inputErrorMessage={"Formato incorrecto"}
                            />
                          </div>
                        ) : null}

                        {fieldValue("desiredCollegiateNumber") ||
                        generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"N° colegiado"}
                              setInputValue={setCollegiateNumber}
                              inputValue={collegiateNumber}
                              inputError={collegiateNumberError}
                              inputErrorMessage={"Formato incorrecto"}
                            />
                          </div>
                        ) : null}

                        {fieldValue("desiredPartnerNumber") ||
                        generalUsersView ? (
                          <div className={`col-span-1 `}>
                            <Input
                              labelClassName={
                                "inline-block font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[5px]"
                              }
                              inputClassName={
                                "w-full bg-transparent border border-[#8B9592] rounded-[10px] h-[47px] px-4 text-[16px] text-[#899592] focus:text-black"
                              }
                              labelTitle={"N° socio"}
                              setInputValue={setPartnerNumber}
                              inputValue={partnerNumber}
                              inputError={partnerNumberError}
                              inputErrorMessage={"Formato incorrecto"}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-row-reverse justify-between px-10 py-5">
                {!loadingButtonCreate ? (
                  <Button
                    buttonText={isEdit ? "Listo" : "Crear"}
                    //buttonOnClickAction={registerUser}
                    buttonOnClickAction={(e) => {
                      isEdit
                        ? generalUsersView
                          ? `${updateUsersGeneralTable()}`
                          : `${updateUsers()}`
                        : `${registerUser()}`;
                    }}
                    validation={validations}
                    buttonClassName={
                      "py-3 rounded-[10px] bg-[#35CA75] hover:bg-green-300 hover:shadow-md px-4"
                    }
                    buttonTextClassName={
                      "font-Inter font-semibold text-[16px] text-center text-white tracking-normal leading-5"
                    }
                  />
                ) : (
                  <div className="bg-[#35CA75] rounded-[10px] px-4 py-3 w-[90px]">
                    <div
                      className="mx-auto flex justify-center w-[20px] h-[20px]
                border-t-8 
                border-t-white  
                rounded-full 
                animate-spin"
                    ></div>
                  </div>
                )}
                <Button
                  buttonText={"Cancelar"}
                  buttonOnClickAction={() => {
                    openCloseModalCreateEdit(), resetValues();
                  }}
                  buttonClassName={
                    "py-3 rounded-[10px] bg-[#E9E9EB] hover:bg-gray-300 hover:shadow-md px-4"
                  }
                  buttonTextClassName={
                    "font-Inter font-semibold text-[16px] text-center text-[#899592] tracking-normal leading-5"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed z-50 inset-0 bg-[#707070] bg-opacity-[0.35] transition-opacity"></div>
    </>
  );
}
