
import React, { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { userListErrorSelect, userListStatusSelect, userListUserListSelect, userListUserSelect } from '../../features/userList/userListSlice';
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

import Select from 'react-select';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { DayPickerComponent } from '../../components/DayPickerComponent';

import { FormModeContext } from '../../context/FormModeContext'

const calendarSwal = withReactContent(Swal);

export const UserPage = () => {
  const { setIsEditingForm } = useContext(FormModeContext);

  const userListDispatch = useDispatch();
  const userListStatus = useSelector(userListStatusSelect);
  const userListUser = useSelector(userListUserSelect);
  const userListUserList = useSelector(userListUserListSelect)
  const userListError = useSelector(userListErrorSelect);

  const [user, setUser] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canRedirectBack, setCanRedirectBack] = useState(false);

  const { userId } = useParams();

  const navigate = useNavigate();

  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [startDate, setStartDate] = useState(new Date());

  const jobOptions = ["Manager", "Reservation desk", "Room service"].map((job) => ({
    value: job,
    label: job
  }))

  const jobStatus = ["Active", "Inactive"].map((status) => ({
    value: status.toLowerCase(),
    label: status
  }))

  const formatDatetime = (datetime) => {
    if (datetime)
      return new Date(Number(datetime)).toLocaleDateString("es-MX", {
        day: "2-digit",
        year: "numeric",
        month: "short"
      });
  } 

  const onSubmit = (formData) => {
    Swal.fire({
      title: `Do you want to ${userId ? "update" : "create"} the user?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `${userId ? "Update" : "Create"}`,
      denyButtonText: ` ${userId ? "Don't update" : "Don't create"}`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "User updated successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          didOpen: () => {
            setCanEdit(!canEdit && !!user);
        
            if (userId) {
              const updateUser = {
                ...user, 
                first_name: formData.userFirstName,
                last_name: formData.userLastName,
                email: formData.userEmail,
                telephone: formData.userTel,
                start_date: formData.userStartDate,
                status: formData.userStatus.value,
                job_description: formData.userJobDescription,
                job: formData.userJob.value,
              }

              setCanRedirectBack(true);

              userListDispatch(userListUpdateOneThunk({user: updateUser, list: userListUserList}));
            } else {
              const newUser = {
                id: self.crypto.randomUUID(),
                photo: "http://dummyimage.com/69x68.png/cc0000/ffffff",
                first_name: formData.userFirstName,
                last_name: formData.userLastName,
                email: formData.userEmail,
                telephone: formData.userTel,
                start_date: formData.userStartDate,
                status: formData.userStatus.value,
                job_description: formData.userJobDescription,
                job: formData.userJob.value
              }

              setCanRedirectBack(true);
              
              userListDispatch(userListCreateOneThunk({user: newUser, list: userListUserList}))
            }
          }
        });
      } else if (result.isDenied) {
        reset();
        setCanEdit(false);
      }
    })
  }

  const deleteUser = () => {
    Swal.fire({
      title: "Do you want to delete the user?",
      showDenyButton: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isDenied) {        
        Swal.fire({
          title: "User deleted successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          didOpen: () => {
            setCanRedirectBack(true);

            userListDispatch(userListDeleteOneThunk({id: userId, list: userListUserList}));
          }
        });
      } 
    });
  }

  const showCalendar = () => {
    let calendarDate = null;

    const onDateChange = (selectedDate) => {
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
        setStartDate(calendarDate);
        setValue("userStartDate", formatDatetime(new Date(calendarDate).getTime()));
      }
    })
  }

  useEffect(() => {
    if (userId)
      userListDispatch(userListReadOneThunk({key: "id", value: userId, list: userListUserList}))

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
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

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
          
          setUser(userListUser);

          setStartDate(new Date(Number(userListUser.start_date)));
        } else if (canRedirectBack) {
          navigate("/users");
        }
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
    console.log(userId)
    console.log(canEdit)
    console.log(!userId || canEdit)
    setIsEditingForm(!!userId || canEdit);
  }, [canEdit])

  return (
    isLoading
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
                <UserFormFieldPhoto width="40%">
                  <img src={user?.photo} alt="" />
                </UserFormFieldPhoto>
                <UserFormFieldContainer width="60%" style={{flexDirection: "column"}}>
                  <UserFormField>
                    <FormFieldLabel htmlFor='userFirstName'>First Name</FormFieldLabel>
                    <FormInput disabled={!canEdit && !!user} { ...register("userFirstName", { value: user?.first_name }) }/>
                  </UserFormField>
                  <UserFormField>
                    <FormFieldLabel htmlFor='userLastName'>Last name</FormFieldLabel>
                    <FormInput disabled={!canEdit && !!user} { ...register("userLastName", { value: user?.last_name }) }/>
                  </UserFormField>
                </UserFormFieldContainer>
              </UserFormFieldContainer>
              <UserFormField width="40%">
                <FormFieldLabel htmlFor='userEmail'>Email</FormFieldLabel>
                <FormInput disabled={!canEdit && !!user} { ...register("userEmail", { value: user?.email }) } />
              </UserFormField>
              <UserFormField width="30%">
                <FormFieldLabel htmlFor='userTel'>Phone number</FormFieldLabel>
                <FormInput disabled={!canEdit && !!user} { ...register("userTel", { value: user?.telephone }) }/>
              </UserFormField>
              <UserFormField width="30%">
                <FormFieldLabel htmlFor='userStartDate'>Start date</FormFieldLabel>
                <FaRegCalendarAlt style={{display:`${!canEdit && !!user ? "none" : "block"}`, cursor: "pointer", position: "absolute", bottom: "22%", left: "1em"}} onClick={showCalendar}/>
                <FormInput disabled={!canEdit && !!user} style={!canEdit && !!user ? {} : {paddingLeft: "2.4em"}} { ...register("userStartDate", { value: formatDatetime(user?.start_date) }) }/>
              </UserFormField>
              <UserFormField width="40%">
                <FormFieldLabel htmlFor='userPassword'>Password</FormFieldLabel>
                <FormInput 
                  disabled={!canEdit && !!user} 
                  style={{textTransform: "capitalize"}}
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
                      isDisabled={!canEdit && !!user}
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
                      isDisabled={!canEdit && !!user}
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
                <FormTextarea name='userJobDescription' disabled={!canEdit && !!user} rows={10} { ...register("userJobDescription", {value: user?.job_description}) }></FormTextarea>
              </UserFormField>    
              <FormButton 
                onClick={() => deleteUser()}
                disabled={canEdit || !user } 
                styled="deny" 
                type='button'
                position="left">
                  Delete 
              </FormButton>
              <FormButton 
                onClick={() => setCanEdit(!canEdit && !!user)} 
                disabled={canEdit || !user } 
                styled="primary" 
                type='button'
                position="right">
                  Edit  
              </FormButton>
              <FormButton 
                onClick={() => {
                  setCanEdit(!canEdit && !!user);

                  reset();

                  if (!userId)
                    navigate("/users");
                }} 
                disabled={!canEdit && !!user} 
                styled="deny" 
                type='button'
                position="left">
                  Dismiss
              </FormButton>   
              <FormButton 
                disabled={!canEdit && !!user} 
                styled="primary" 
                type='submit'
                position="right">
                  {userId ? "Update" : "Create"}
              </FormButton>
     
            </FormFieldListContainer>
          </UserForm>
        </UserContainer>
      </>
  )
}

