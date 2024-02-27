import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

function PastEvent() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await axios.get('https://event-backend.isdemo.in/api/v1/get_past_events');
      if (response.status === 200) {
        setEventList(response.data.events); // Assuming the response data has a property named 'events' containing the list of events
      } else {
        console.error('Failed to fetch event data');
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  return (
    <div id="event_page_main">
      <div className="container mx-auto px-4">
        <h1 className="text-center">Events List</h1>
        <p className="text-center">
          Your time is limited, don’t waste it living someone else’s life. Don’t be trapped by dogma,
          which is living the result of other people’s thinking. <br />
          Don’t let the noise of other opinions drown your own inner voice.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="events_box">
          <div className="events">
            <table className="event">
              <thead>
                <tr>
                  <td>Date</td>
                  <td className="event-thumb-head"></td>
                  <td>Artist</td>
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
                      <td className="event-date">{moment(item.date).format('DD/MM/YYYY')}</td>
                      <td className="event-thumb">
                        <Link to={`/event/${item.id}`}>
                          <img
                            width="90px"
                            height="100px"
                            src={item.featured_image}
                            alt="Event"
                          />
                        </Link>
                      </td>
                      <td className="event-artist">{item.name}</td>
                      <td className="event-title">
                        <Link to={`/event/${item.id}`}>{item.name}</Link>
                      </td>
                      <td className="event-ticket-link">
                        {item.ticket_status === 'available' ? (
                          <Link to={`/book/${item.id}`} className="button button-white rsvp">
                            BOOK
                          </Link>
                        ) : (
                          <span className="sold">EXPIRED</span>
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
                  <a href={`/event/${item.id}`}>
                    <img
                      width="70px"
                      height="100px"
                      src={item.featured_image}
                      alt="Event"
                    />
                  </a>
                </span>
                <p>
                  <span>Date :</span>{' '}
                  <a href={`/event/${item.id}`}>{moment(item.date).format('DD/MM/YYYY')}</a>
                </p>
                <p>
                  <span>Artist :</span> <a href={`/event/${item.id}`}>{item.name}</a>
                </p>
                <p>
                  <span>Event :</span> <a href={`/event/${item.id}`}>{item.name}</a>
                </p>
                <p>
                  {item.ticket_status === 'available' ? (
                    <a href={`/book/${item.id}`} className="button-basic-1">
                      BUY TICKET
                    </a>
                  ) : (
                    <span className="sold">TICKET SOLD OUT</span>
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
