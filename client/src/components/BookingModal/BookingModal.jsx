import React from 'react'
import { Button, Modal } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useContext } from 'react'
import UserDetailContext from '../../context/UserDetailContext'
import { bookVisit } from '../../utils/api'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const BookingModal = ({opened, setOpened, email, propertyId}) => {

    const [value, setValue] = useState(null);
    const { userDetails : {token}, setUserDetails } = useContext(UserDetailContext);
    
    console.log("Token: ", token);
    
    const handleBookingSuccess = () => {
        toast.success("You have booked your visit", {
            position: "bottom-right"
        });
        setUserDetails((prev)=>({
            ...prev,
                bookings: Array.isArray(prev.bookings) ? [...prev.bookings, {
                   id: propertyId,
                   date: dayjs(value).format('DD/MM/YYYY')
                }] : [{
                   id: propertyId,
                   date: dayjs(value).format('DD/MM/YYYY')
                }]
        }));
    }

    const {mutate, isLoading} = useMutation({
        mutationFn: ()=> bookVisit(value, propertyId, email, token),
        onSuccess: ()=> handleBookingSuccess(),
        onError: ({response}) => toast.error(response.data.message),
        onSettled: ()=>setOpened(false)
    });

  return (
    <Modal
        opened = {opened}
        onClose = {()=>setOpened(false)}
        title = "Select your data of visit"
        centered
    >
        <div className='flexColCenter' style={{gap:"1rem"}}>
            <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
            <Button disabled={!value || isLoading} onClick={() => mutate()}>Book Visit</Button>
        </div>

    </Modal>
  )
}

export default BookingModal