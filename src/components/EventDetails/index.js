
import React, { useState, useEffect, Navigate } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import Map from "../Map";
import UpcomingEvents from "../EventDetails/UpcomingEvents";
import axios from 'axios';
import '../Custom.css'; 
import 'rc-time-picker/assets/index.css';
import TimePicker from "../TimePicker";
import Loader from "react-js-loader";
import { Link } from 'react-router-dom';
import ViewLayout from "../../Modal/ViewLayout";

import DatePicker from "../DatePicker";
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import DOB from "../Dob";


    const EventDetails = () => {
        const navigate = useNavigate()
       
        const [mySection, setMySection] = useState(null);
        const { id } = useParams();
        const [numberOfEvents, setNumberOfEvents] = useState(null);
        const [isModalOpen, setModalOpen] = useState(false);
        const [startTime] = useState(null);
        const [dob, setDob] = useState('');
        const [date] = useState(null);
        const [bookingNote] = useState("");
        const [guestsNumber] = useState(0);
        const [eventDetails, setEventDetails] = useState(null);
        const [eventId, setEventId] = useState('')
        const [loader, setLoader] = useState(true)
        const [isPopupOpen, setPopupOpen] = useState(false);
        const [events, setEvents] = useState([]);
        const [error, setError] = useState(null);
        const [formSubmitted, setFormSubmitted] = useState(false);
        const [venueId, setVenueId] = useState(25);
        const [selectedDate, setSelectedDate] = useState(new Date());
        // const [selectedOption, setSelectedOption] = useState('');
        // const [showTextarea, setShowTextarea] = useState(false);

        const [showTextarea, setShowTextarea] = useState(false);
        const [selectedOption, setSelectedOption] = useState('select');
        
    
      
    
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
     
      //   function handleSelectChange(event) {
      //     const selectedValue = event.target.value;
      //     setSelectedOption(selectedValue);
      //     setShowTextarea(selectedValue === 'other');
      // }
  
     
        

      
        
    
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
          const handleSelectChange = (event) => {
            const selectedValue = event.target.value;
            if (selectedValue === 'other') {
                document.getElementById('booking_note_textarea').style.display = 'block';
            } else {
                document.getElementById('booking_note_textarea').style.display = 'none';
            }
        };
    
        if (loader) {
            return (
                <Loader type="spinner-cub" bgColor={'white'} color={'white'} size={100} />
            )
        }
  return (
    <div id="evnet_booking">
    <div className="md:container md:mx-auto">
      <div className="relative p-4 bg-color rounded-lg shadow dark:bg-gray-800 sm:p-5">
    
        <div className="grid grid-cols-2 gap-4">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="w-full">
                {eventDetails && (
                  <img src={eventDetails.featured_image ?? ""} alt="cart" />
                )}
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-10 w-full mb-5 group">
                <div className="w-full"> 
              <DatePicker />
              </div>
             
              </div>
              <div class="relative z-0 w-full mb-5 group table-section">
              <button
                className="input block w-full placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-white-300 sm:text-sm sm:leading-6 border-2 border-gray-700 rounded-md px-4 py-2 text-gray-700 dark:text-gray-400"
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
            <form class="max-w-4xl mx-auto" onSubmit={handleSubmit}>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    name="Preffered Section"
                    id="section"
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      mySection ? "highlight-input" : ""
                    }`}
                    placeholder=""
                    value={mySection || ""}
                  />
                  <label
                    for="section"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Preffered Section
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
              
                  <TimePicker
                    // id="floating_password arrival_time"
                    id="arrival_time"
                    className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={handleTimeChange}
                    value={arrivalTime}
                    
                    format="hh:mm a"
                    placeholder="HH:mm AM/PM"
                  />
                  <label
                    for="arrival_time"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-gray-900 bg-transparent"
                  >
                    Estimated Time of Arrival
                  </label>
                </div>
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    // name="floating_first_name first_name"
                    // name="first_name"
                   
                    id="first_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                   
                  />
                  <label
                    for="first_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    // name="last_name"
                    id="last_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    
                  />
                  <label
                    for="last_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    id="phone"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    
                  />
                  <label
                    for="phone"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    // name="email"
                    id="email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                   
                  />
                  <label
                    for="email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
              </div>
           
             
                <div className="relative z-10 w-full mb-5 group">
                  <label
                    htmlFor="dob"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Date of Birth
                  </label>
                  <DOB
                    onChange={handleDobChange}
                    utcOffset={new Date().getTimezoneOffset()}
                    placeholder=""
                    // value={formData.dob}
                  />
                </div>
            
             
                <div className="relative z-0 w-full mb-5 group">
                  {/* {showTextarea ? (
                    <textarea
                      rows="8"
                      // name="booking_note_textarea"
                      id="booking_note_textarea"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // required
                    ></textarea>
                  ) : (
                    <select
                      id="booking_note_select"
                      // name="booking_note"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      onChange={handleSelectChange}
                      value={formData.selectedOption}
                    
                    >
                      <option value="select" >
                        Select a booking note
                      </option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="anniversary">Anniversary Party</option>
                      <option value="graduation">Graduation Dinner</option>
                      <option value="other">Other</option>
                    </select>
                  )} */}


<select
                id="booking_note_select"
                name="booking_note"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleSelectChange}
              >
                <option value="" className="text-darkgray " >
                  Select a booking note
                </option>
                <option value="birthday">Birthday Celebration</option>
                <option value="anniversary">Anniversary Party</option>
                <option value="graduation">Graduation Dinner</option>
                <option value="other">Other</option>
              </select>{" "}
             
              <textarea
                id="booking_note_textarea"
                name="other_event_note"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Your occasion or special request?"
                style={{ display: "none" }}
              />
  
                  {
                    <label
                    
                      for="booking_note"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Booking Note:
                    </label>
                  }
                </div>
              
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  // name="no_of_seats"
                  id="no_of_seats"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                
                />
                <label
                  for="no_of_seats"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Total Guests:
                </label>
              </div>
  
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>

      </div>
        {/* //////////////////////// */}
    <div id="evnet_page_main">
        {/* <div className="container mx-auto px-4"> */}
          <h1 class="text-center">   Upcoming Event</h1>
              <div>
                    <button
                      className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full view-all"
                      type="button"
                      onClick={handleButtonClick}
                    >
                      View All
                    </button>
                  </div>
            <UpcomingEvents venueId={venueId} />
      {/* </div> */}
  </div>
    </div>
  
  </div>
  
  

  )
}

export default EventDetails
