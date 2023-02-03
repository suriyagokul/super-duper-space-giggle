import React, { useState } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { Link, useNavigate  } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import {appointmentValidation} from "../helper/validate"
import {registerAppointment} from "../helper/helper"


const timeSlots = [
  { "value": "8:00 AM", "label": "8:00 AM" },
  { "value": "9:00 AM", "label": "9:00 AM" },
  { "value": "10:00 AM", "label": "10:00 AM" },
  { "value": "11:00 AM", "label": "11:00 AM" },
  { "value": "12:00 PM", "label": "12:00 PM" },
  { "value": "1:00 PM", "label": "1:00 PM" },
  { "value": "2:00 PM", "label": "2:00 PM" },
  { "value": "3:00 PM", "label": "3:00 PM" },
  { "value": "4:00 PM", "label": "4:00 PM" },
  { "value": "5:00 PM", "label": "5:00 PM" },
];



function AppointmentPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [date, setSelectedDate] = useState(null);
  const [time, setSelectedTime] = useState(null);

  const service = location.state.btn; // getting name of service or button title from carddata 
  // console.log(service);
  

  function handleAppointment(event){
    event.preventDefault();

  axios.post('/api/appointment', {
    date: date,
    time: time.value,
    purpose:service
  }).then(response => {
  console.log(response.data);
  }).catch(error => {
  console.error(error);
  });
    // console.log(typeof(date));
    if(!date && !time){
      toast.error("Date and Time is Required...")
      // console.log("Not Selected dATE");
    }
    else if(!date){
      toast.error("Date is Required...")
    }
    else if(!time){
      toast.error("Time is Required...!")
    }
    else navigate('/payment')
  }


  return (
      <div className="container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h2 className="text-center my-3">Book Your Appointment</h2>
      <form className="py-1" method="post" onSubmit={handleAppointment}>
      <input type="text" 
             placeholder={service} 
             value={service} 
             className="form-control mx-auto my-3"
             style={{width: "20%", display:"block"}}   
             readOnly
      />
        <div className="form-group mb-3">
          <label>Select a date:</label>
          <DatePicker
            className="form-control"
            selected={date}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            showTimeSelect={false}
          />
         {date ? <p>Date selected: {date.toString()}</p> : console.log("No date selected")}

        </div>
        <div className="form-group mb-3">
          <label>Select a time:</label>
          <Select
            className="form-control"
            options={timeSlots}
            value={time}
            onChange={(time) => setSelectedTime(time)}
          />
        </div>
        <div class="alert alert-danger text-bold text-black" role="alert">
          Consultation Fee: 300 INR
        </div>

        <button className="btn btn-primary" >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}

export default AppointmentPage;
