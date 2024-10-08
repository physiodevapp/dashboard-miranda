
import React, { useContext, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { resetUserStatusError, userListErrorSelect, userListStatusSelect, userListUserListSelect, userListUserSelect } from '../../features/userList/userListSlice';
import { userListReadOneThunk } from '../../features/userList/userListReadOneThunk';

import { BounceLoader } from 'react-spinners';

import { FormButton, UserContainer, UserForm, UserFormField, UserFormFieldContainer, UserFormFieldPhoto } from './UserStyled';
import { FormFieldLabel, FormFieldListContainer, FormInput, FormTextarea } from '../../components/FormField';

import { useForm, Controller } from 'react-hook-form';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { userListUpdateOneThunk } from '../../features/userList/userListUpdateOneThunk';
import { userListCreateOneThunk } from '../../features/userList/userListCreateOneThunk';
import { userListDeleteOneThunk } from '../../features/userList/userListDeleteOneThunk';

import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { DayPickerComponent } from '../../components/DayPickerComponent';

import { FormModeContext, FormModeContextInterface } from '../../context/FormModeContext'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserInterface } from '../../modelInterface';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';

type UserStatusType = "active" | "inactive";

interface UserStatusOption {
  value: UserStatusType,
  label: UserStatusType,
}

type UserJobType = "Manager" | "Reservation desk" | "Room service";

interface UserJobOption {
  value: UserJobType,
  label: UserJobType,
}

interface FormInputInterface {
  userFirstName: string,
  userLastName: string,
  userEmail: string,
  userTel: string,
  userStartDate: string,
  userStatus: UserStatusOption,
  userJobDescription: string,
  userJob: UserJobOption,
  userPassword: string,
}

const jobStatus: UserStatusOption[] = ["Active", "Inactive"].map((status) => ({
  value: status.toLowerCase() as UserStatusType,
  label: status as UserStatusType
}))

const jobOptions: OptionsOrGroups<UserJobOption, GroupBase<UserJobOption>> = ["Manager", "Reservation desk", "Room service"].map((job) => ({
  value: job as UserJobType,
  label: job as UserJobType
}))

const calendarSwal = withReactContent(Swal);

export const UserPage = () => {
  const useFormMode = (): FormModeContextInterface => {
    const context = useContext(FormModeContext);
    if (!context) {
      throw new Error('useFormMode must be used within an FormModeProvider');
    }
    return context;
  };
  const { setIsEditingForm } = useFormMode();

  const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  const { userState } = useAuth();

  const userListDispatch = useAppDispatch();
  const userListStatus = useAppSelector(userListStatusSelect);
  const userListUser = useAppSelector(userListUserSelect);
  const userListUserList = useAppSelector(userListUserListSelect)
  const userListError = useAppSelector(userListErrorSelect);

  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [canRedirectBack, setCanRedirectBack] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const { userId = "" } = useParams();

  const navigate = useNavigate();

  const { register, handleSubmit, control, reset, setValue, formState } = useForm<FormInputInterface>();
  const { dirtyFields } = formState; 

  const formatDatetime = (datetime: string): string => {
    if (!datetime)
      datetime = new Date().getTime().toString();
    
    return new Date(datetime).toLocaleDateString("en-US", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    })
  } 

  const onSubmit = (formData: FormInputInterface): void => {
    Swal.fire({
      title: `Do you want to ${userId ? "update" : "create"} the user?`,
      icon: "question",
      showDenyButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: `${userId ? "Update" : "Create"}`,
      denyButtonText: ` ${userId ? "Don't update" : "Don't create"}`,
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {        
        const denyButton = Swal.getDenyButton();
        if (denyButton) {
          denyButton.disabled = true;
          denyButton.style.display = 'none'; 
        }

        try {
          setIsUpdating(true);

          if (userId) {
            const updateUser: UserInterface = {
              ...userListUser!, 
              first_name: formData.userFirstName,
              last_name: formData.userLastName,
              email: formData.userEmail,
              telephone: formData.userTel,
              start_date: formData.userStartDate,
              status: formData.userStatus.value,
              job_description: formData.userJobDescription,
              job: formData.userJob.value,
            };

            if (dirtyFields.userPassword) {
              updateUser.password = formData.userPassword;
            }

            const resultAction = await userListDispatch(userListUpdateOneThunk({ user: updateUser })).unwrap();
  
            // Check if the action was rejected
            if (userListUpdateOneThunk.rejected.match(resultAction)) {
              // Handle the error from the thunk
              throw new Error(resultAction.payload || 'Update failed');
            }
            
          } else {
            const newUser: UserInterface = {
              photo: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
              first_name: formData.userFirstName,
              last_name: formData.userLastName,
              email: formData.userEmail,
              telephone: formData.userTel,
              status: formData.userStatus.value,
              job_description: formData.userJobDescription,
              job: formData.userJob.value,
              password: formData.userPassword,
              start_date: formData.userStartDate,
            };
            const resultAction = await userListDispatch(userListCreateOneThunk({ user: newUser })).unwrap();

            // Check if the action was rejected
            if (userListCreateOneThunk.rejected.match(resultAction)) {
              // Handle the error from the thunk
              throw new Error(resultAction.payload || 'Create failed');
            }
          }

          // If no errors, show success
          Swal.fire({
            title: `User ${userId ? "updated" : "created"} successfully`,
            icon: "success",
            confirmButtonText: "Accept",
          });        
        } catch (error) {
          Swal.update({
            icon: "error",
            title: `${userId ? "Updating" : "Creating"} the user failed`,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
          })

          Swal.showValidationMessage(`Request failed: ${error}`);
        }

      }
    }).then((result) => {
      setIsUpdating(false);
      userListDispatch(resetUserStatusError());

      if (result.isDenied) {
        setCanEdit(false);
        reset();
      } else if(result.isDismissed) {
        setCanEdit(true)
      } else if (result.isConfirmed) {
        navigate("/users");
      }
    })
  }

  const deleteUser = (): void => {
    Swal.fire({
      title: "Do you want to delete the user?",
      showDenyButton: true,
      showLoaderOnDeny: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preDeny: async () => {        
        const confirmButton = Swal.getConfirmButton();
        if (confirmButton) {
          confirmButton.disabled = true;
          confirmButton.style.display = 'none'; 
        }

        try {
          setIsUpdating(true);

          const resultAction = await userListDispatch(userListDeleteOneThunk({ id: userId }));

          // Check if the action was rejected
          if (userListDeleteOneThunk.rejected.match(resultAction)) {
            // Handle the error from the thunk
            throw new Error(resultAction.payload || 'Delete failed');
          }
          
          Swal.fire({
            title: "User deleted successfully",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Accept", 
          });
        } catch (error) {
          Swal.update({
            icon: "error",
            title: "Deleting the user failed",
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
          })

          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      }
    }).then((result) => {
      setIsUpdating(false);
      userListDispatch(resetUserStatusError());

      if (result.isDenied) {
        navigate("/users");
      }
    });
  }

  const showCalendar = (): void => {
    let calendarDate: Date | null = null;

    const onDateChange = (selectedDate: Date) => {
      calendarDate = selectedDate;
    }

    calendarSwal.fire({
      title:`Select a date`,
      showClass: {
        popup:`
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup:`
          animate__animated
          animate__fadeOut
          animate__faster
        `
      },
      html: <DayPickerComponent 
              startDate={startDate}
              onChangeDate={onDateChange}
              />,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Update date',
      customClass: {
        popup: "calendar__popup",
        title: "calendar__title",
        htmlContainer: "calendar__container"
      }     
    }).then((result) => {
      if (result.isConfirmed) {
        setStartDate(calendarDate!);
        setValue("userStartDate", formatDatetime(calendarDate!.toISOString()));
      }
    })
  }

  useEffect(() => {
    if (userId)
      userListDispatch(userListReadOneThunk({ id: userId }))

  }, [userId])

  useEffect(() => {
    switch (userListStatus) {
      case "idle":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
      case "fulfilled":
        setIsLoading(false);

        if (userListUser && userId) {          
          reset({
            userJob: {
              value: userListUser.job, 
              label: userListUser.job 
            },
            userStatus: {
              value: userListUser.status,
              label: userListUser.status
            },
            userStartDate: formatDatetime(userListUser.start_date),
          });

          setStartDate(new Date(userListUser.start_date));
        } 
        // else if (canRedirectBack) {
        //   navigate("/users");
        // }
        break;
      case "rejected":
        setIsLoading(false);
        console.log({userListError});
        break;
      default:
        break;
    }
  }, [userListStatus]);

  useEffect(() => {
    setIsEditingForm(canEdit || !userId);

    return () => {
      setIsEditingForm(false);
    }
  }, [canEdit]);

  return (
    isLoading && !isUpdating
    ? <>
        <BounceLoader
          color={"#135846"}
          loading={isLoading}
          cssOverride={{
            position: "relative",
            top: "40%",
            display: "block",
            margin: "0 auto",
            borderColor: "#135846",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </>
    : <>
        <UserContainer>
          <UserForm onSubmit={handleSubmit(onSubmit)}>
            <FormFieldListContainer>
              <UserFormFieldContainer>
                <UserFormFieldPhoto width="40%" defaultphoto={ userListUser?.photo.includes("iconpacks") ? 'true' : 'false' }>
                  <img src={userListUser?.photo || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} alt="user-photo" />
                </UserFormFieldPhoto>
                <UserFormFieldContainer width="60%" style={{flexDirection: "column"}}>
                  <UserFormField>
                    <FormFieldLabel htmlFor='userFirstName'>First Name</FormFieldLabel>
                    <FormInput disabled={!canEdit && !!userListUser} { ...register("userFirstName", { value: userListUser?.first_name }) }/>
                  </UserFormField>
                  <UserFormField>
                    <FormFieldLabel htmlFor='userLastName'>Last name</FormFieldLabel>
                    <FormInput disabled={!canEdit && !!userListUser} { ...register("userLastName", { value: userListUser?.last_name }) }/>
                  </UserFormField>
                </UserFormFieldContainer>
              </UserFormFieldContainer>
              <UserFormField width="40%">
                <FormFieldLabel htmlFor='userEmail'>Email</FormFieldLabel>
                <FormInput disabled={!canEdit && !!userListUser} { ...register("userEmail", { value: userListUser?.email }) } />
              </UserFormField>
              <UserFormField width="30%">
                <FormFieldLabel htmlFor='userTel'>Phone number</FormFieldLabel>
                <FormInput disabled={!canEdit && !!userListUser} { ...register("userTel", { value: userListUser?.telephone }) }/>
              </UserFormField>
              <UserFormField width="30%">
                <FormFieldLabel htmlFor='userStartDate'>Start date</FormFieldLabel>
                <FaRegCalendarAlt style={{display:`${!canEdit && !!userListUser ? "none" : "block"}`, cursor: "pointer", position: "absolute", bottom: "22%", left: "1em"}} onClick={showCalendar}/>
                <FormInput disabled={!canEdit && !!userListUser} style={!canEdit && !!userListUser ? {} : {paddingLeft: "2.4em"}} { ...register("userStartDate", { value: formatDatetime(userListUser?.start_date || new Date().toISOString()) }) }/>
              </UserFormField>
              <UserFormField width="40%">
                <FormFieldLabel htmlFor='userPassword'>Password</FormFieldLabel>
                <FormInput 
                  disabled={!canEdit && !!userListUser}
                  style={{textTransform: "capitalize"}}
                  placeholder={(!canEdit && !!userListUser) ? '****' : 'Create a new password'}
                  { ...register("userPassword", { value: '' }) }/>
              </UserFormField>
              <UserFormField width="30%">
                <FormFieldLabel htmlFor='userStatus'>Job position</FormFieldLabel>
                <Controller
                  name='userJob'
                  control={control} 
                  render={({ field }) => (
                    <Select
                      { ...field }
                      closeMenuOnSelect={false}
                      options={jobOptions}
                      placeholder={"Select one"}
                      isClearable
                      isDisabled={!canEdit && !!userListUser}
                      styles={{
                        container: (baseStyles, state) => ({
                          ...baseStyles,
                          width: "100%",
                        }),
                        valueContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          gap: "0.2em",
                          paddingTop: "0.35em",
                          paddingBottom: "0.35em"
                        }),
                        indicatorsContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          cursor: "pointer",
                          display: state.isDisabled
                            ? "none"
                            : baseStyles.display
                        }),
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "white",
                          borderColor: state.isDisabled
                            ? "white"
                            : baseStyles.borderColor
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontFamily: "Poppins",
                          fontSize: "0.9rem",  
                          backgroundColor: state.isFocused
                            ? "#EEF9F2"
                            : baseStyles.backgroundColor
                          ,                  
                          ':hover': {
                            ...baseStyles,
                            fontSize: "0.9rem", 
                            color: "#135846",
                            backgroundColor: "#EEF9F2",
                          }
                        }),
                        multiValueLabel: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "#135846",
                          backgroundColor: "#EEF9F2",
                          lineHeight: `${canEdit ? "1.4em" : "4em"}`,
                          padding: state.isDisabled 
                            ? "0em 1em !important"
                            : baseStyles.padding
                          ,
                          textAlign: "center",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          fontFamily: "Poppins"
                        }), 
                        multiValueRemove: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "#135846",
                          backgroundColor: "#EEF9F2",
                          display: state.isDisabled
                            ? "none"
                            : baseStyles.display
                          ,
                          ':hover': {
                            backgroundColor: "#135846",
                            color: 'white',
                            cursor: "pointer"
                          },
                        }),                  
                      }}
                    />
                  )}
                />
              </UserFormField>
              <UserFormField width="30%">
                <FormFieldLabel htmlFor='userStatus'>Status</FormFieldLabel>
                  <Controller
                  name='userStatus'
                  control={control} 
                  render={({ field }) => (
                    <Select
                      { ...field }
                      closeMenuOnSelect={false}
                      options={jobStatus}
                      placeholder={"Select one"}
                      isClearable
                      isDisabled={!canEdit && !!userListUser}
                      styles={{
                        container: (baseStyles, state) => ({
                          ...baseStyles,
                          width: "100%",
                        }),
                        valueContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          gap: "0.2em",
                          paddingTop: "0.35em",
                          paddingBottom: "0.35em",
                          textTransform: "capitalize",
                        }),
                        indicatorsContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          cursor: "pointer",
                          display: state.isDisabled
                            ? "none"
                            : baseStyles.display
                        }),
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "white",
                          borderColor: state.isDisabled
                            ? "white"
                            : baseStyles.borderColor
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontFamily: "Poppins",
                          fontSize: "0.9rem",  
                          backgroundColor: state.isFocused
                            ? "#EEF9F2"
                            : baseStyles.backgroundColor
                          ,                  
                          ':hover': {
                            ...baseStyles,
                            fontSize: "0.9rem", 
                            color: "#135846",
                            backgroundColor: "#EEF9F2",
                          }
                        }),
                        multiValueLabel: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "#135846",
                          backgroundColor: "#EEF9F2",
                          lineHeight: `${canEdit ? "1.4em" : "4em"}`,
                          padding: state.isDisabled 
                            ? "0em 1em !important"
                            : baseStyles.padding
                          ,
                          textAlign: "center",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          fontFamily: "Poppins"
                        }), 
                        multiValueRemove: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "#135846",
                          backgroundColor: "#EEF9F2",
                          display: state.isDisabled
                            ? "none"
                            : baseStyles.display
                          ,
                          ':hover': {
                            backgroundColor: "#135846",
                            color: 'white',
                            cursor: "pointer"
                          },
                        }),                  
                      }}
                    />
                    )}
                  />
              </UserFormField>
              <UserFormField width="100%">
                <FormFieldLabel htmlFor="userJobDescription">Job description</FormFieldLabel>
                <FormTextarea disabled={!canEdit && !!userListUser} rows={10} { ...register("userJobDescription", {value: userListUser?.job_description}) }></FormTextarea>
              </UserFormField>    
              {
                userListUser?.id === userState?.id 
                ?
                <FormButton 
                  disabled={ true } 
                  styled="deny" 
                  type='button'
                  position="readonly">
                    Read-only user 
                </FormButton>
                :
                <>
                  <FormButton 
                    onClick={() => deleteUser()}
                    disabled={canEdit || !userListUser || userListUser.id === userState?.id } 
                    styled="deny" 
                    type='button'
                    position="left">
                      Delete 
                  </FormButton>
                  <FormButton 
                    onClick={() => setCanEdit(!canEdit && !!userListUser)} 
                    disabled={canEdit || !userListUser || userListUser.id === userState?.id } 
                    styled="primary" 
                    type='button'
                    position="right">
                      Edit  
                  </FormButton>
                  <FormButton 
                    onClick={() => {
                      setCanEdit(!canEdit && !!userListUser);

                      reset();
                      // setStartDate(new Date(userListUser!.start_date));

                      if (!userId)
                        navigate("/users");
                    }} 
                    disabled={!canEdit && !!userListUser } 
                    styled="deny" 
                    type='button'
                    position="left">
                      Dismiss
                  </FormButton>   
                  <FormButton 
                    disabled={!canEdit && !!userListUser} 
                    styled="primary" 
                    type='submit'
                    position="right">
                      {userId ? "Update" : "Create"}
                  </FormButton>
                </>
              }
            </FormFieldListContainer>
          </UserForm>
        </UserContainer>
      </>
  )
}

