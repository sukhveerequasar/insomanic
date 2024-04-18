
import React, { useRef, useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import Modal from 'react-modal';
import Modal from 'react-modal';
import axios from 'axios'; 
import Loader from "react-js-loader";
import './../../components/Custom.css';


const ViewLayout = ({ isOpen, onRequestClose }) => {
  const [response, setResponse] = useState([]);
  const [myBox, setMyBox] = useState([]);
  const [imgWidth, setImgWidth] = useState();
  const [imgHeight, setImgHeight] = useState();
  const [url, setUrl] = useState();
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState(null);
  const [loader,setLoader] =useState(true)

  useEffect(() => {
    fetch();
  }, []);
 
  const fetch = async () => {
    const vid = localStorage.getItem('Venue');
    
    try {
      // Set loader to true only once, at the beginning of the API call
      setLoader(true);
  
      const response = await axios.get(`https://event-backend.isdemo.in/api/v1/get_layout`, {
        params: {
          venue_id: 25,
        },
      });
  
      console.log(response.data, 'Response coming from the get Layout API ======>>');
      setResponse(response.data[0]);
      setMyBox(response.data[0].box_details);
      setUrl(response.data[0].image_url);
    } catch (err) {
      setLoader(false)
      console.error(err);
    } finally {
      // Set loader to false regardless of success or error
      setLoader(false);
    }
  };
  
  

  const boxes = myBox.map((box, index) => {
    const { x, y, width, height, box_name, sectionName } = box;
    return [parseFloat(x), parseFloat(y)
, parseFloat(width), parseFloat(height), box_name, sectionName];
  });

  

  const canvasRef = useRef(null);

  const drawBoxes = (highlightedSection) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const image = new Image();
    image.src = url;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'red';
    context.lineWidth = 16;
    context.font = '14px Arial';

    boxes.forEach((box, index) => {
      const [x, y, width, height, name, section] = box;
      context.strokeStyle = section === highlightedSection ? 'gold' : 'transparent';
      context.strokeRect(x, y, width, height);
      context.fillStyle = 'transparent';
      // context.fillText(name, x + 5, y + 15);
    });
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let isHovering = false;

    for (let i = 0; i < boxes.length; i++) {
      const [x, y, width, height, name, section] = boxes[i];
      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        setHoveredBoxIndex(i);
        isHovering = true;
        break;
      }
    }

    if (!isHovering) {
      setHoveredBoxIndex(null);
    }

    const highlightedSection = isHovering && hoveredBoxIndex !== null ? boxes[hoveredBoxIndex][5] : null;
    drawBoxes(highlightedSection);
  };

  useEffect(() => {
    const loadImage = async () => {
      const image = new Image();
      image.src = url;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      drawBoxes();
      setImgWidth(image.width);
      setImgHeight(image.height);
    };

    if (url) {
      loadImage();
    }
  }, [url, canvasRef.current, isOpen, hoveredBoxIndex]);

  // useEffect(() => {
  //   fetch();
  // }, [url]);

// ... (previous code)

const handleCanvasClick = (event) => {
  const canvas = canvasRef.current;
  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  for (let i = 0; i < boxes.length; i++) {
    const [x, y, width, height, name, section] = boxes[i];
    if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
      // alert(`Clicked on section: ${section}`);
      localStorage.setItem('Section',section)
      onRequestClose();
      break;
    }
  }
};

return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Example Modal"
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'none',
        border: 'none',
        padding: 0,
        maxHeight: '100vh',
        zIndex: 0,
      },
    }}
  >
   
    {loader ? (
      <div style={{ overflow: 'hidden' }}> {/* Hide overflow while loader is displayed */}
        <Loader type="spinner-cub" bgColor={'white'} color={'white'} size={100} className="loader" />
      </div>
    ) : (
      <div className='p-17 bg-[transparent]'>
        <h1 className='text-center text-lg'>SELECT SECTION </h1>
       <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <button onClick={onRequestClose} className="close-button">
      <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
      <canvas
        ref={canvasRef}
        width={imgWidth || 600}
        height={imgHeight || 400}
        // style={{ border: '1px solid #ccc' }}
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
        className='convasdata'
      ></canvas>
      </div>
      
    )}
      
  </Modal>
);
};
export default ViewLayout;


