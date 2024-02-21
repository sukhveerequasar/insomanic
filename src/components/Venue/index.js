import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import { useParams } from 'react-router-dom';
import { useParams, useNavigate,Link  } from 'react-router-dom';
import '../Custom.css'; 
import Loader from "react-js-loader";

export default function Index() {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { venueId } = useParams();
  
   
    useEffect(() => {
      console.log('Fetching data for venueId:', venueId);
      const fetchData = async () => {
        try {
          // Encode the venueId parameter
          const encodedVenueId = encodeURIComponent(venueId);
  
          // Make the API request using the encoded venueId
          const response = await axios.get(`https://event-backend.isdemo.in/api/v1/event?venue_id=${venueId}`);
          console.log('API Response:', response.data);
  
          setEventList(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [venueId]);
  
    if (loading) {
      // Show loader while loading is true
      return <Loader type="spinner-cub" bgColor={'white'} color={'white'} size={100} />;
    }
  return (
    <div id='evnet_page_main'>
      <div className='container mx-auto px-4'>
        <h1 class="text-center">Upcoming Events.</h1>
        <p class="text-center">Your time is limited, don’t waste it living someone else’s life. Don’t be trapped by dogma, which is living the result of other people’s thinking. <br />Don’t let the noise of other opinions drown your own inner voice.</p>
      </div>
      <div className='container mx-auto px-4'>
        <div className='events_box'>
          <div className='events'>
            <table class="event">
              <thead>
                <tr>
                  <td>Date</td>
                  <td class="event-thumb-head"></td>
                  <td>Artist</td>
                  <td>Event</td>
                  <td>Ticket</td>
                </tr>
                <tr class="space">
                  <td>
                        &nbsp;
                    </td>
                </tr>
              </thead>
            
              <tbody>
                                {eventList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="event-date">{moment(item.date).format('DD/MM/YYYY')}</td>
                                        <td className="event-thumb">
                                            <Link to={`/event/${item.id}`}>
                                                <img width="90px" height="100px" src={item.featured_image} alt="Event" />
                                            </Link>
                                        </td>
                                        <td className="event-artist">{item.name}</td>
                                        <td className="event-title">
                                            <Link to={`/event/${item.id}`}>{item.name}</Link>
                                        </td>
                                        <td className="event-ticket-link">
                                            {item.ticket_status === 'available' ? (
                                                <Link to={`/book/${item.id}`} className="button button-white rsvp">BOOK</Link>
                                            ) : (
                                                <span className="sold">EXPIRED</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
              
            </table>
          </div>
        </div>
        <div class="event-mobile">
          <ul class="event-list">
              <li>
                  <span class="img-thumb">
                      <a href="single-event.html">
                        {/* <img width="70px" height="100px" src={Eventimg} alt="cart" /> */}
                      </a>
                  </span>
                  <p><span>Date :</span> <a href="single-event.html">26/09/2022</a></p>
                  <p><span>Artist :</span> <a href="single-event.html">DJ Ocean &amp; DJ Thunder</a></p>
                  <p><span>Event :</span> <a href="single-event.html">Global Fridays</a></p>
                  <p>
                      <a href="#/" class="button-basic-1">BUY TICKET</a>
                  </p>
              </li>
              <li>
                  <span class="img-thumb">
                      <a href="single-event.html">
                      {/* <img width="70px" height="100px" src={Eventimg} alt="cart" />  */}
                      </a>
                  </span>
                  <p><span>Date :</span> <a href="single-event.html">26/09/2021</a></p>
                  <p><span>Artist :</span> <a href="single-event.html">W. Illinvois</a></p>
                  <p><span>Event :</span> <a href="single-event.html">Chicago Indrustry</a></p>
                  <p>
                      <a href="#/" class="button-basic-1">BUY TICKET</a>
                  </p>
              </li>
              <li>
                  <span class="img-thumb">
                      <a href="single-event.html">
                      {/* <img width="70px" height="100px" src={Eventimg} alt="cart" /> */}
                      </a>
                  </span>
                  <p><span>Date :</span> <a href="single-event.html">26/03/2021</a></p>
                  <p><span>Artist :</span> <a href="single-event.html">Apollo Xo</a></p>
                  <p><span>Event :</span> <a href="single-event.html">The Underground</a></p>
                  <p>
                      <a href="#/" class="button-basic-1">BUY TICKET</a>
                  </p>
              </li>
              <li>
                  <span class="img-thumb">
                      <a href="single-event.html">
                      {/* <img width="70px" height="100px" src={Eventimg} alt="cart" /> */}
                      </a>
                  </span>
                  <p><span>Date :</span> <a href="single-event.html">26/05/2021</a></p>
                  <p><span>Artist :</span> <a href="single-event.html">Underground Music</a></p>
                  <p><span>Event :</span> <a href="single-event.html">EDM</a></p>
                  <p>
                      <span class="sold">TICKET SOLD OUT</span> </p>
              </li>
              <li>
                  <span class="img-thumb">
                      <a href="single-event.html">
                      {/* <img width="70px" height="100px" src={Eventimg} alt="cart" /> */}
                      </a>
                  </span>
                  <p><span>Date :</span> <a href="single-event.html">26/06/2021</a></p>
                  <p><span>Artist :</span> <a href="single-event.html">Bhad Bhabie</a></p>
                  <p><span>Event :</span> <a href="single-event.html">Asian Dolls</a></p>
                  <p>
                      <a href="#/" class="button-basic-1">BUY TICKET</a>
                  </p>
              </li>
          </ul>
      </div>
      </div>
    </div>
  )
}
