

import React, { useState, useEffect, Navigate } from "react";
import { useNavigate, useParams } from "react-router-dom";
// // import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css';

import Map from "../Map";
import UpcomingEvents from "../EventDetails/UpcomingEvents";
import axios from 'axios';
// import TimePicker from 'react-time-picker'; 
import '../Custom.css'; // Adjust the path as needed
import 'rc-time-picker/assets/index.css';
import TimePicker from "../TimePicker";
// const navigate = useNavigate()
import Loader from "react-js-loader";
import { Link } from 'react-router-dom';
import ViewLayout from "../../Modal/ViewLayout";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "../DatePicker";
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import DOB from "../Dob";

const EventDetails = () => {
    const navigate = useNavigate()
    // const venueId=localStorage.getItem('Venue')
    const [mySection, setMySection] = useState(null);

    const { id } = useParams();
    const [numberOfEvents, setNumberOfEvents] = useState(null);
    // const [venueId, setVenueId] = useState(null);
    // const { venueId } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [startTime] = useState(null);
    // const [dob] = useState(null);
    const [dob, setDob] = useState('');
    const [date] = useState(null);
    const [bookingNote] = useState("");
    const [guestsNumber] = useState(0);
    const [eventDetails, setEventDetails] = useState(null);
    const [eventId, setEventId] = useState('')
    const [loader, setLoader] = useState(true)
    const [isPopupOpen, setPopupOpen] = useState(false);
    // const [selectedDate, setSelectedDate] = useState('');
    const [events, setEvents] = useState([]);
    // Initialize venue_id to an appropriate default value
    const [error, setError] = useState(null);
    // const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    // const venueId = 25;
    const [venueId, setVenueId] = useState(25);
    const [selectedDate, setSelectedDate] = useState(new Date());
    

  

    //handleButtonClick redirect  venue page
    const handleButtonClick = () => {
      navigate(`/venue/${venueId}`);
    };
// Section  localStorage  remove
    useEffect(()=>{
        localStorage.removeItem('Section');
    },[])

    const [formData, setFormData] = useState({
        section: "",
        arrival_time: "",
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        dob: "",
        booking_note: "",
        no_of_seats: "",
        // agreeTerms: false,
    });

    // const handleInputChange = (e) => {
    //     const { id, value, type, checked } = e.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [id]: type === "checkbox" ? checked : value,
    //     }));
    // };
    const handleFocus = (event) => {
        if (!event.target.value) {
            event.target.type = 'date';
        }
    };
    
    const handleBlur = (event) => {
        if (!event.target.value) {
            event.target.type = 'text';
        }
    };
    const [arrivalTime, setArrivalTime] = useState(null);

    const handleTimeChange = (value) => {
        setArrivalTime(value);
    };
    const handleClick = () => {
        
        setModalOpen(!isModalOpen); // Toggle the visibility of both the initial popup and ViewLayout modal
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    
  
    const handleInputChange = (event) => {
        setDob(event.target.value);
    };

    // Function to validate the date format (optional)
    const isValidDateFormat = (dateString) => {
        // You can implement your date format validation logic here
        // For simplicity, let's assume any non-empty string is valid
        // return dateString.trim() !== '';

    };
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'other') {
            document.getElementById('booking_note_textarea').style.display = 'block';
        } else {
            document.getElementById('booking_note_textarea').style.display = 'none';
        }
    };

    const isValidFormData = () => {
        // Implement your validation logic here
        return true; // For demonstration, always return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidFormData()) {
            // Show error toast for invalid form data
            toast.error('Please fill out all required fields.', {
                position: 'top-center',
                autoClose: 1000,
            });
            return;
        }

        // Capture form data
        const formData = {
            section: document.getElementById('section').value,
            arrival_time: arrivalTime,
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            // dob: document.getElementById('dob').value,
            dob: dob, // Assign the dob directly here
            booking_note: document.getElementById('booking_note_select').value,
            no_of_seats: document.getElementById('no_of_seats').value,
            // agreeTerms: document.getElementById('agreeTerms').checked,
            venue_id: eventDetails.venue_id, // Replace with the actual venue_id
            event_id: eventDetails.id, // Replace with the actual event_id
        };
        // if (!isValidDateFormat(dob)) {
        //     // Display an error message for invalid date format
        //     toast.error('Invalid date of birth format.', {
        //         position: 'top-center',
        //         autoClose: 1000,
        //     });
        //     return;
        // }

        try {
            const response = await axios.post("https://event-backend.isdemo.in/api/v1/ticketbooking", formData);

            if (response.status === 200) {
                console.log("Form submitted successfully!");
                // Add any additional logic or redirection after successful form submission
            } else {
                console.error("Form submission failed.");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }

        // Display success toast
        toast.success('Form submitted successfully!', {
            position: 'top-center',
            autoClose: 1000,
        });

        // Wait for a moment before refreshing the page
        setTimeout(() => {
            // Refresh the page
            window.location.reload();
        }, 3000); // Adjust the time according to your needs
    };



    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`https://event-backend.isdemo.in/api/v1/event_single_list?id=${id}`);
                console.log('Event Details API Response:', response.data);
                console.log('venueId:', venueId);

                if (response.data.id == id) {
                    setEventDetails(response.data);
                    setLoader(false)
                    const venueResponse = await axios.post(
                      `https://event-backend.isdemo.in/api/v1/venue_detail`,
                      { id: response.data.venue_id } // Assuming venue_id is the parameter expected by the API
                  );
                  console.log('Venue Details API Response:', venueResponse.data);
                }
                else {
                    setLoader(false)
                    setEventDetails(null);
                }
            } catch (error) {
                setLoader(false)
                return navigate(`/event`)

            }
        };

        fetchEventDetails();
    }, [id]);

    const fetchDataByDateAndVenue = async () => {
        console.log(venueId);
        try {
            const response = await axios.get(`https://event-backend.isdemo.in/api/v1/events_date`, {
                params: {
                    venue_id: venueId,
                    date_search: selectedDate,
                },
            });

            console.log('API Response:', response.data);

            // Handle the response as needed...
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error during API request:', error);
            // Handle errors if needed
        }
    };

    // useEffect to fetch data when the selectedDate or id changes
    useEffect(() => {
        fetchDataByDateAndVenue();
    }, [selectedDate, venueId]);

    useEffect(() => {
        setMySection(localStorage.getItem('Section'));
    }, )
   

      const handleDobChange = (start) => {
        console.log(start,"testing is now done")
        setDob(start);
      
      };

    if (loader) {
        return (
            <Loader type="spinner-cub" bgColor={'white'} color={'white'} size={100} />
        )
    }




    return (
   
    <div className="container-event event_form mx-auto p-8 bg-cover bg-fixed bg-center">
  {/* container-event event_form mx-auto p-8  */}
  {eventDetails && (
    <h1 className="text-white text-4xl mb-4 text-center">
      {eventDetails.name ?? ""}
    </h1>
  )}
  <div className="flex justify-center items-center mb-4 event-main">
    <div className="w-full">
      <div className="flex">
        <div className="w-2/5">
          {eventDetails && (
            <img
              className="h-41  event-image"
              src={eventDetails.featured_image ?? ""}
              alt="Event Image"
            />
          )}
        </div>
        <div className="w-3/5">
          <div className="flex space-x-1 top_frm_bar">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <DatePicker />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <div className="table-section">
                <button
                  className="input block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none  focus:ring-white-300 sm:text-sm sm:leading-6"
                  onClick={handleClick}
                >
                  Table Selection
                </button>
                {isModalOpen && (
                  <ViewLayout
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Map Image */}
          <div className="w-full px-3 row-block no-padding">
            {/* Location Section */}
            <div className="pad-block">
              <div className="form-title sm">LOCATION</div>
              <div className="m-b-sm">
                <a
                  target="_blank"
                  className="text-blue-500 hover:underline"
                ></a>
              </div>
              {/* <Map
                                containerElement={<div style={{ height: '400px' }} />}
                                mapElement={<div style={{ height: '100%' }} />}
                                lat={eventDetails?.latitude}
                                lng={eventDetails?.longitude}
                                address={eventDetails?.address}
                            /> */}
                               {/* <Map apiKey="AIzaSyArSHw2xNrtWq3LgmGhEwFvVfTjL7PkVMg" address={eventDetails?.address} /> */}
                               <Map apiKey="AIzaSyArSHw2xNrtWq3LgmGhEwFvVfTjL7PkVMg" address={eventDetails?.address} />
                               
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center items-center event-main">
    <div class="px-4 w-full">
      <div class="flex">
        <div className="container w-full event_form">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 top_mrg">
              <div className="flex-1 space-y-2 text-white">
                <label htmlFor="section" className="text-darkgray text-lg">
                  Preferred Section:
                </label>
                <input
                  name="Preffered Section"
                  placeholder="Preferred Section"
                  className={`text-darkgray bg-transparent common-pointer focus:outline-none  focus:ring-white-300 ${
                    mySection ? "highlight-input" : ""
                  }`}
                  id="section"
                  value={mySection || ""}
                  size="md"
                  variant="fill"
                  readOnly
                />
              </div>

              <div className="flex-1 space-y-2 text-white">
                <label htmlFor="arrival_time" className="text-darkgray text-lg">
                  Estimated Time of Arrival:
                </label>
                <div className="custom-timepicker ">
                  <TimePicker
                    id="arrival_time"
                    className="input"
                    onChange={handleTimeChange}
                    value={arrivalTime}
                    format="hh:mm a"
                    placeholder="HH:mm AM/PM"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 top_mrg">
              {/* First Name */}
              <div className="flex-1 space-y-2 text-white">
                <label htmlFor="first_name" className="text-darkgray text-lg">
                  First Name:
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="input custom-input font-roboto"
                  placeholder="John"
                />
              </div>
              {/* Last Name */}
              <div className="flex-1 space-y-2 text-white">
                <label htmlFor="last_name" className="text-darkgray text-lg">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="input custom-input font-roboto"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="flex space-x-4 top_mrg">
              <div className="flex-1 space-y-2 text-white">
                <label htmlFor="phone" className="text-darkgray text-lg">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input custom-input font-roboto"
                  placeholder="555-1234"
                />
              </div>
              <div className="flex-1 space-y-2 text-white">
                <label htmlFor="email" className="text-darkgray text-lg">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="input custom-input font-roboto"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            <div className="flex space-x-4 top_mrg">
              <div className="flex-1 space-y-2 text-white">

              {/* <DOB placeholder='DOB' onChange={handleDobChange}  utcOffset={new Date().getTimezoneOffset()}/> */}
                <label htmlFor="dob" className="text-darkgray text-lg">
                  Date of Birth:
                </label>
                {/* <input type="date" id="dob" className="input custom-input"   placeholder="DOB"  /> */}
                {/* <input
                  type="text"
                  id="dob"
                  className="input custom-input font-roboto"
                  placeholder="DOB"
                  value={dob}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                /> */}
                <DOB placeholder='DOB' onChange={handleDobChange}  utcOffset={new Date().getTimezoneOffset()}/>
              </div>
            </div>
            <div className="space-y-2 text-white top_mrg">
              <label htmlFor="booking_note" className="text-darkgray text-lg">
                Booking Note:
              </label>
              <select
                id="booking_note_select"
                name="booking_note"
                className="input custom-input transparent-background font-roboto booking-notes-padding"
                onChange={handleSelectChange}
              >
                <option value="1" className="text-darkgray ">
                  Select a booking note
                </option>
                <option value="birthday">Birthday Celebration</option>
                <option value="anniversary">Anniversary Party</option>
                <option value="graduation">Graduation Dinner</option>
                <option value="other">Other</option>
              </select>{" "}
              <label
                htmlFor="booking_note"
                className="text-darkgray text-lg"
              ></label>
              <textarea
                id="booking_note_textarea"
                name="other_event_note"
                className="input custom-input font-roboto"
                placeholder="Your occasion or special request?"
                style={{ display: "none" }}
              />
            </div>
            <div className="space-y-2 text-white top_mrg_no_of_seats">
              {/* <input type="number" id="no_of_seats" className="input custom-guest" min="1"placeholder="Total Guests:" /> */}
              <input
                type="text"
                id="no_of_seats"
                className="input custom-guest font-roboto"
                placeholder="Total Guests:"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            >
              Submit Inquiry
            </button>
          </form>

          {/* React Toastify container for displaying toasts */}
          <ToastContainer />
        </div>
      </div>
    </div>
  </div>
  {/* <UpcomingEvents /> */}
  <div className="flex justify-between items-center mb-4 event-main">
    <div className="px-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl mb-4 text-center">
          Upcoming Events
        </h1>
        <div>
          <button
            className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full view-all"
            type="button"
            onClick={handleButtonClick}
          >
            View All
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center items-center event-main-upcoming">
    <UpcomingEvents venueId={venueId} />
  </div>
</div>

    );
};

export default EventDetails;