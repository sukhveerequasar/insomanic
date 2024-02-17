// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../Custom.css';

// const UpcomingEvents = ({ exodusVenue, venueId }) => {
//   console.log(venueId);

//   const [loadingUpcoming, setLoadingUpcoming] = useState(true);
//   const [upcoming, setUpcoming] = useState([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       setLoadingUpcoming(true);

//   //       const response = await axios.get('https://event-backend.isdemo.in/api/v1/upcoming_events', {
//   //         params: {
//   //           venue_id: venueId,
//   //         },
//   //       });

//   //       setUpcoming(response.data.data);
//   //       // setvenueId(response.data.data.venue_id)
//   //     } catch (error) {
//   //       console.error('Error fetching upcoming events:', error);
//   //     } finally {
//   //       setLoadingUpcoming(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [venueId]);
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

//   return (
//     <div className={`upcoming-events ${!loadingUpcoming ? 'ng-scope' : ''}`} ngif={!loadingUpcoming}>
//       <div className="flex flex-wrap -mx-4">
//         {upcoming && Array.isArray(upcoming) && upcoming.length > 0 ? (
//           // console.log(upcoming,"up: "),
//           upcoming.slice(0, 5).map((event, index) => (
//             <EventCard
//               key={index}
//               event={event}
//               showMeta={!exodusVenue}
//               // Pass any additional parameters or functions as needed
//             />
//           ))
//         ) : (
//           <div className="container">
//       <div className="flex justify-center m-8 evet_block">
//         {/* Image 1 */}
//         {/* <div className="m-2">
//           <img
//             src="/sunday.png" // Replace with your image URL
//             alt="Event 1"
//             className="w-full h-auto"
//           />
//           <div className="text-center mt-2">Grand Opening: NYE 2024!</div>
//           <div className="text-center mt-2">
//             <span className="text-center mt-2">DEC</span>
//             <span className="text-center mt-2">31</span></div>
//             <div className="text-center mt-2">1920 Market Street</div>
//             <div className="text-center mt-2">Book Table Service</div>
//         </div> */}

//         {/* Image 2 */}
//         {/* <div className="m-2">
//           <img
//             src="/thursday.png" // Replace with your image URL
//             alt="Event 2"
//             className="w-full h-auto"
//           />
//           <div className="text-center mt-2">Thursday: Riot House Denver</div>
//           <div className="text-center mt-2">
//             <span className="text-center mt-2">DEC</span>
//             <span className="text-center mt-2">31</span></div>
//             <div className="text-center mt-2">1920 Market Street</div>
//             <div className="text-center mt-2">Book Table Service</div>
//         </div> */}

//         {/* Image 3 */}
//         {/* <div className="m-2">
//           <img
//             src="/saturaday.png" // Replace with your image URL
//             alt="Event 3"
//             className="w-full h-auto"
//           />
//           <div className="text-center mt-2">Saturday: Riot House Denver</div>
//           <div className="text-center mt-2">
//             <span className="text-center mt-2">DEC</span>
//             <span className="text-center mt-2">31</span></div>
//             <div className="text-center mt-2">1920 Market Street</div>
//             <div className="text-center mt-2">Book Table Service</div>
//         </div> */}
//       </div>
//     </div>
//           // <div>No Upcoming Events</div>
//         )}
//       </div>
//     </div>
//   );
// };

// const EventCard = ({ event, showMeta }) => {
//   const [loading, setLoading] = useState(false);

//   const handleLinkClick = () => {
//     // Set loading to true when the link is clicked
//     setLoading(true);

//     // Simulate fetching data (replace this with your actual data fetching logic)
//     setTimeout(() => {
//       // Set loading back to false after data is fetched (replace this with your actual logic)
//       setLoading(false);

//       // Change the URL immediately upon clicking the link
//       window.location.href = `/event/${event.id}`;
//     }, 2000); // Simulating a 2-second delay, replace with your actual fetching logic duration
//   };
//   return (
//     // <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
//     //   <div className="event-card-wrap">
//     //   {/* <div className="">
//     //       <h1 className='text-white text-8xl mb-4 text-center'>Upcoming Events</h1>
//     //   </div> */}
//     //     {/* <div className="card-image">
//     //       <img
//     //         className="w-full h-64 object-cover"
//     //         src={event.featured_image}
//     //         alt="Event Image"
//     //       />
//     //     </div> */}
//     //      <Link to={`/event/${event.id}`}>
//     //       <div className="card-image">
//     //         <img
//     //           className="w-full h-64 object-cover"
//     //           src={event.featured_image}
//     //           alt="Event Image"
//     //         />
//     //       </div>
//     //     </Link>
//     //     <div className="event-card-info mt-2">
//     //       <div className={`info ${!showMeta ? 'center' : ''}`}>
//     //         <div className="name ng-binding">{event.name}</div>
//     //         {showMeta && (
//     //           <div className="ng-scope">
//     //             <div className="over ng-binding">{event.location}</div>
//     //             <div className="over ng-binding">Book Table Service</div>
//     //           </div>
//     //         )}
//     //       </div>
//     //       {showMeta && (
//     //         <div className="date ng-scope mt-2">
//     //           <span className="orange ng-binding">{event.month}</span>
//     //           <br />
//     //           <span className="ng-binding">{event.day}</span>
//     //         </div>
//     //       )}
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 h-41  event-image">
//       <div className="event-card-wrap">
       
//         {/* Use onClick to handle the link click event */}
//         <div onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
//           <div className="card-image">
//             <img
//               className=" h-64 object-cover"
//               src={event.featured_image}
//               alt="Event Image"
//             />
//           </div>
//         </div>
//         <div className="event-card-info mt-2">
//           <div className={`info ${!showMeta ? 'center' : ''}`}>
//             <div className="name ng-binding">{event.name}</div>
//             {showMeta && (
//               <div className="ng-scope">
//                 <div className="over ng-binding">{event.location}</div>
//                 <div className="over ng-binding">Book Table Service</div>
//               </div>
//             )}
//           </div>
//           {showMeta && (
//             <div className="date ng-scope mt-2">
//               <span className="orange ng-binding">{event.month}</span>
//               <br />
//               <span className="ng-binding">{event.day}</span>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Render loader based on the loading state */}
//       {loading && <div>Loading...</div>}
//     </div>
  
//   );
// };
  
// export default UpcomingEvents;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Custom.css';

const UpcomingEvents = ({ exodusVenue, venueId }) => {
  console.log(venueId);

  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [upcoming, setUpcoming] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoadingUpcoming(true);

  //       const response = await axios.get('https://event-backend.isdemo.in/api/v1/upcoming_events', {
  //         params: {
  //           venue_id: venueId,
  //         },
  //       });

  //       setUpcoming(response.data.data);
  //       // setvenueId(response.data.data.venue_id)
  //     } catch (error) {
  //       console.error('Error fetching upcoming events:', error);
  //     } finally {
  //       setLoadingUpcoming(false);
  //     }
  //   };

  //   fetchData();
  // }, [venueId]);
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

  return (
    <div className={`upcoming-events ${!loadingUpcoming ? 'ng-scope' : ''}`} ngif={!loadingUpcoming}>
      <div className="flex flex-wrap -mx-4 grid grid-cols-4 gap-4">
        
        {upcoming && Array.isArray(upcoming) && upcoming.length > 0 ? (
          // console.log(upcoming,"up: "),
          upcoming.slice(0, 5).map((event, index) => (
            <EventCard
              key={index}
              event={event}
              showMeta={!exodusVenue}
              // Pass any additional parameters or functions as needed
            />
          ))
        ) : (
          <div className="container">
      <div className="flex justify-center m-8 evet_block">
       
      </div>
    </div>
          // <div>No Upcoming Events</div>
        )}
      </div>
      </div>
  );
};

const EventCard = ({ event, showMeta }) => {
  const [loading, setLoading] = useState(false);

  const handleLinkClick = () => {
    // Set loading to true when the link is clicked
    setLoading(true);

    // Simulate fetching data (replace this with your actual data fetching logic)
    setTimeout(() => {
      // Set loading back to false after data is fetched (replace this with your actual logic)
      setLoading(false);

      // Change the URL immediately upon clicking the link
      window.location.href = `/event/${event.id}`;
    }, 2000); // Simulating a 2-second delay, replace with your actual fetching logic duration
  };
  return (
    // <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
    //   <div className="event-card-wrap">
    //   {/* <div className="">
    //       <h1 className='text-white text-8xl mb-4 text-center'>Upcoming Events</h1>
    //   </div> */}
    //     {/* <div className="card-image">
    //       <img
    //         className="w-full h-64 object-cover"
    //         src={event.featured_image}
    //         alt="Event Image"
    //       />
    //     </div> */}
    //      <Link to={`/event/${event.id}`}>
    //       <div className="card-image">
    //         <img
    //           className="w-full h-64 object-cover"
    //           src={event.featured_image}
    //           alt="Event Image"
    //         />
    //       </div>
    //     </Link>
    //     <div className="event-card-info mt-2">
    //       <div className={`info ${!showMeta ? 'center' : ''}`}>
    //         <div className="name ng-binding">{event.name}</div>
    //         {showMeta && (
    //           <div className="ng-scope">
    //             <div className="over ng-binding">{event.location}</div>
    //             <div className="over ng-binding">Book Table Service</div>
    //           </div>
    //         )}
    //       </div>
    //       {showMeta && (
    //         <div className="date ng-scope mt-2">
    //           <span className="orange ng-binding">{event.month}</span>
    //           <br />
    //           <span className="ng-binding">{event.day}</span>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="">
      <div className="event-card-wrap upcoming-img">
       
        {/* Use onClick to handle the link click event */}
        <div onClick={handleLinkClick} style={{ cursor: 'pointer' }} >
          <div className="card-image">
            <img
              className=" h-64 object-cover"
              src={event.featured_image}
              alt="Event Image"
            />
          </div>
        </div>
        <div className="event-card-info mt-2">
          <div className={`info ${!showMeta ? 'center' : ''}`}>
            <div className="name ng-binding">{event.name}</div>
            {showMeta && (
              <div className="ng-scope">
                <div className="over ng-binding">{event.location}</div>
                <div className="over ng-binding">Book Table Service</div>
              </div>
            )}
          </div>
          {showMeta && (
            <div className="date ng-scope mt-2">
              <span className="orange ng-binding">{event.month}</span>
              <br />
              <span className="ng-binding">{event.day}</span>
            </div>
          )}
        </div>
      </div>
      {/* Render loader based on the loading state */}
      {loading && <div>Loading...</div>}
    </div>
  
  );
};
  
export default UpcomingEvents;



