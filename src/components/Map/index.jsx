
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '518px',
  height: '316px'
};

const Map = ({ apiKey, address }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey
  });

 

  useEffect(() => {
    if (!isLoaded) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setLocation({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }, [isLoaded, address]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};

export default Map;



