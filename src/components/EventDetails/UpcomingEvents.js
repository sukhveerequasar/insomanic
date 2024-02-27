

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../Custom.css';
// import moment from 'moment';

// const UpcomingEvents = ({ exodusVenue, venueId }) => {
//   console.log(venueId);

//   const [loadingUpcoming, setLoadingUpcoming] = useState(true);
//   const [upcoming, setUpcoming] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoadingUpcoming(true);

//         const response = await axios.get('https://event-backend.isdemo.in/api/v1/upcoming_events', {
//           params: {
//             venue_id: venueId,
//           },
//         });

//         setUpcoming(response.data.data);
//       } catch (error) {
//         console.error('Error fetching upcoming events:', error);
//       } finally {
//         setLoadingUpcoming(false);
//       }
//     };

//     fetchData();
//   }, [venueId]);

//   if (loadingUpcoming) {
//     return (
//         <loadingUpcoming type="spinner-cub" bgColor={'white'} color={'white'} size={100} />
//     )
// }

// return (
//   // <div id="event_page_main">
  
//     <div className="">
//       <div className="events_box">
//         <div className="events">
//           <table className="event">
//             <thead>
//               <tr>
//                 <td>Date</td>
//                 <td className="event-thumb-head"></td>
//                 <td>Artist</td>
//                 <td>Event</td>
            
//               </tr>
//               <tr className="space">
//                 <td colSpan="5"></td>
//               </tr>
//             </thead>
//             <tbody>
//               {upcoming.map((item, index) => (
//                 <React.Fragment key={index}>
//                   <tr>
//                     <td className="event-date">{moment(item.date).format("DD/MM/YYYY")}</td>
//                     <td className="event-thumb">
//                       <Link to={`/event/${item.id}`}>
//                         <img width="90px" height="100px" src={item.featured_image} alt="Event" />
//                       </Link>
//                     </td>
//                     <td className="event-artist">{item.name}</td>
//                     <td className="event-title">
//                       <Link to={`/event/${item.id}`}>{item.name}</Link>
//                     </td>
                 
//                   </tr>
//                   <tr className="space h-10">
//                     <td colSpan="5"></td>
//                   </tr>
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="event-mobile">
//         <ul className="event-list">
//           {upcoming.map((item, index) => (
//             <li key={index}>
//               <span className="img-thumb">
//                 <a href={`/event/${item.id}`}>
//                   <img width="70px" height="100px" src={item.featured_image} alt="Event" />
//                 </a>
//               </span>
//               <p><span>Date :</span> <a href={`/event/${item.id}`}>{moment(item.date).format("DD/MM/YYYY")}</a></p>
//               <p><span>Artist :</span> <a href={`/event/${item.id}`}>{item.name}</a></p>
//               <p><span>Event :</span> <a href={`/event/${item.id}`}>{item.name}</a></p>
             
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   // </div>
// );
// };
  
// export default UpcomingEvents;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Custom.css';
import moment from 'moment';

const UpcomingEvents = ({ venueId }) => {
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUpcoming(true);

        const response = await axios.get('https://event-backend.isdemo.in/api/v1/upcoming_events', {
          params: {
            venue_id: venueId,
          },
        });

        setUpcoming(response.data.data);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      } finally {
        setLoadingUpcoming(false);
      }
    };

    fetchData();
  }, [venueId]);

  if (loadingUpcoming) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="events_box">
        <div className="events">
          <table className="event">
            <thead>
              <tr>
                <td>Date</td>
                <td className="event-thumb-head"></td>
                <td>Artist</td>
                <td>Event</td>
              </tr>
              <tr className="space">
                <td colSpan="5"></td>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="event-date">{moment(item.date).format("DD/MM/YYYY")}</td>
                    <td className="event-thumb">
                      <a href={`/event/${item.id}`}>
                        <img width="90px" height="100px" src={item.featured_image} alt="Event" />
                      </a>
                    </td>
                    <td className="event-artist">{item.name}</td>
                    <td className="event-title">
                      <a href={`/event/${item.id}`}>{item.name}</a>
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
          {upcoming.map((item, index) => (
            <li key={index}>
              <span className="img-thumb">
                <a href={`/event/${item.id}`}>
                  <img width="70px" height="100px" src={item.featured_image} alt="Event" />
                </a>
              </span>
              <p><span>Date :</span> <a href={`/event/${item.id}`}>{moment(item.date).format("DD/MM/YYYY")}</a></p>
              <p><span>Artist :</span> <a href={`/event/${item.id}`}>{item.name}</a></p>
              <p><span>Event :</span> <a href={`/event/${item.id}`}>{item.name}</a></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
  
export default UpcomingEvents;




