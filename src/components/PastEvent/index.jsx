


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import { useParams } from 'react-router-dom';
import { useParams, useNavigate,Link  } from 'react-router-dom';
import '../Custom.css'; 
import Loader from "react-js-loader";

const PastEvent = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { venueId } = useParams();
  const [vid,setVid]=useState("")

 
  useEffect(() => {
    console.log('Fetching data for venueId:', venueId);
    const fetchData = async () => {
      try {
        // Encode the venueId parameter
        const encodedVenueId = encodeURIComponent(venueId);

        console.log(venueId,"id incoming is===>>")
        if(!venueId || venueId === "null" || venueId === "undefined"){
          setVid("25")
        }
        else{
          setVid(venueId)
        }


        console.log(vid,"tesing ===>>")

        // Make the API request using the encoded venueId
        const response = await axios.get(`https://event-backend.isdemo.in/api/v1/past_events?venue_id=${vid}`);
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
  }, );

  if (loading) {
    // Show loader while loading is true
    return <Loader type="spinner-cub" bgColor={'white'} color={'white'} size={100} />;
  }


  return (
    <div id="evnet_page_main">
      <div className="container mx-auto px-4">
        <h1 className="text-center">Past Event List </h1>
        <p className="text-center">
          Your time is limited, don’t waste it living someone else’s life. Don’t be
          trapped by dogma, which is living the result of other people’s thinking.{" "}
          <br />
          Don’t let the noise of other opinions drown your own inner voice.
        </p>
        <div className="flex justify-end mt-10">
  <button
    className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full current-event"
    type="button"
  >
    <a href="/venue" className='current-event'>Current Event</a>
  </button>
</div>
      </div>
      <div className="container mx-auto px-4">
        <div className="events_box">
          <div className="events">
            <table className="event">
              <thead>
                <tr>
                  <td>Date</td>
                  <td className="event-thumb-head">Event Image</td>
                  {/* <td>Artist</td> */}
                  <td>Event</td>
                  <td>Ticket</td>
                </tr>
                <tr className="space">
                  <td>&nbsp;</td>
                </tr>
              </thead>
              <tbody>
                {eventList.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="event-date">
                        {moment(item.date_from).format("DD/MM/YYYY")}
                      </td>
                      <td className="event-thumb">
                        {/* <Link to={`/event/${item.id}`}> */}
                          <img
                            width="90px"
                            height="100px"
                            src={item.featured_image}
                            alt="Event"
                          />
                        {/* </Link> */}
                      </td>
                      {/* <td className="event-artist">{item.name}</td> */}
                      <td className="event-title">
                        {/* <Link to={`/event/${item.id}`}>{item.name}</Link> */}
                        {item.name}
                      </td>
                      <td className="event-ticket-link">
                        {item.past ? (
                          <span className="sold">Book</span>
                        ) : (
                          // <Link
                          //   to={`//${item.id}`}
                          //   className="button button-white rsvp expired"
                          // >
                             <span    className="button button-white rsvp expired">EXPIRED</span>
                            
                          // </Link>
                        )}
                      
                      </td>
                    </tr>
                    <tr className="space h-10">
                      <td colSpan="5"></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="event-mobile">
          <ul className="event-list">
            {eventList.map((item, index) => (
              <li key={index}>
                <span className="img-thumb">
                  {/* <a href={`/event/${item.id}`}> */}
                    <img
                      width="70px"
                      height="100px"
                      src={item.featured_image}
                      alt="Event"
                    />
                  {/* </a> */}
                </span>
                <p>
                  <span>Date :</span>{" "}
                  <a href={`/event/${item.id}`}>
                    {moment(item.date_from).format("DD/MM/YYYY")}
                  </a>
                </p>
                <p>
                  <span>Artist :</span>{" "}
                  <a href={`/event/${item.id}`}>{item.name}</a>
                </p>
                <p>
                  <span>Event :</span>{" "}
                  <a href={`/event/${item.id}`}>{item.name}</a>
                </p>
                <p>
                  {item.past ? (
                    <span>
                      EXPIRED&nbsp;
                      <Link
                        to={`/event/${item.id}`}
                        className="button-basic-1"
                      >
                        BUY TICKET
                      </Link>
                    </span>
                  ) : (
                    <Link
                      to={`/event/${item.id}`}
                      className="button-basic-1"
                    >
                      BUY TICKET
                    </Link>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PastEvent;
