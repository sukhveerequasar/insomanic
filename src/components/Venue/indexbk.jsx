
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import { useParams } from 'react-router-dom';
import { useParams, useNavigate,Link  } from 'react-router-dom';
import '../Custom.css'; 
import Loader from "react-js-loader";

const Venue = () => {
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
    <div className='flex-auto'>
    <div className="md:container md:mx-auto">
              
          
           <div className="grid grid-cols-4 gap-4">
               
          <div className="event-list event_data mt-4">
  {eventList.slice(0, 5).map((item) => (
    <Link
      key={item.id}
      to={`/event/${item.id}`}
      className=" rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105 event-card mb-4"
    >
      
      <img
        className="h-56 object-cover event-image"
        src={item.featured_image}
        alt="Event Image"
      />
      <div className="flex justify-between items-center">
      <p className="text-gray-700 event-label font-bold">{moment(item.date_from).format('dddd')}@ {item.name}</p>
        <div className="text-gray-700 event-label">
        <p className="block text-xl font-semibold"><span className='month_text'>{moment(item.date_from).format('MMMM')}</span>
          {moment(item.date_from).format('D')}  
  </p>
 
 
</div>

        
      </div>
    </Link>
  ))}
</div>
</div>
        
</div>
</div>
 
  );
};

export default Venue;










