
// import React, { useState } from 'react';
// import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';
// import moment from 'moment';

// const Timepicker = ({ value, onChange, placeholder, className }) => {
//   const [timePickerVisible, setTimePickerVisible] = useState(false);

//   const handleTimeChange = (time) => {
//     // Call the onChange callback with the selected time
//     onChange(time);

//     // Close the TimePicker popup
//     setTimePickerVisible(false);
//   };

//   const toggleTimePicker = () => {
//     // Toggle the visibility of the TimePicker
//     setTimePickerVisible(!timePickerVisible);
//   };

//   return (
//     <div onClick={toggleTimePicker}>
//       <TimePicker
//         onChange={handleTimeChange}
//         value={value ? moment(value) : null}
//         showSecond={false}
//         format="h:mm A"
//         use12Hours
//         placeholder={placeholder}
//         className={`custom-timepicker ${className}`}
//         open={timePickerVisible}
//       />
//     </div>
//   );
// };

// export default Timepicker;
// import 'rc-time-picker/assets/index.css';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import moment from 'moment';
// import TimePicker from 'rc-time-picker';

// const format = 'h:mm a';
// const now = moment().hour(0).minute(0);

// function onChange(value) {
//   console.log(value && value.format(format));
// }

// const Timepicker = () => (
  
//   <TimePicker
//     showSecond={false}
//     defaultValue={now}
//     className="xxx"
//     onChange={onChange}
//     format={format}
//     use12Hours
//     inputReadOnly
//   />
// );



// export default Timepicker;
// import 'rc-time-picker/assets/index.css';
// import React, { useState } from 'react';
// import moment from 'moment';
// import TimePicker from 'rc-time-picker';

// const format = 'h:mm a';
// const now = moment().hour(0).minute(0);

// const Timepicker = () => {
//   const [value, setValue] = useState(now);

//   const onChange = (newValue) => {
//     console.log(newValue && newValue.format(format));
//     setValue(newValue);
//   };

//   return (
//     <TimePicker
//       showSecond={false}
//       defaultValue={now}
//       className="xxx"
//       onChange={onChange}
//       format={format}
//       use12Hours
//       inputReadOnly
//       addon={() => (
//         <button onClick={() => console.log(value)}>OK</button>
//       )}
//     />
//   );
// };

// export default Timepicker;
// import 'rc-time-picker/assets/index.css';
// import React, { useState, useRef } from 'react';
// import moment from 'moment';
// import TimePicker from 'rc-time-picker';

// const format = 'h:mm a';
// const now = moment().hour(0).minute(0);

// const Timepicker = () => {
//   const [value, setValue] = useState(now);
//   const [selectedHour, setSelectedHour] = useState(null);
//   const [selectedMinute, setSelectedMinute] = useState(null);
//   const [selectedPeriod, setSelectedPeriod] = useState(null);
//   const pickerRef = useRef(null);
//   const [popupVisible, setPopupVisible] = useState(false);

//   const onChange = (newValue) => {
//     setValue(newValue);
//     setSelectedHour(newValue && newValue.hour());
//     setSelectedMinute(newValue && newValue.minute());
//     setSelectedPeriod(newValue && newValue.format('a'));
//   };

//   const handleOpenPopup = () => {
//     setPopupVisible(true);
//   };

//   const handleClosePopup = () => {
//     // Check if all values are selected before closing the popup
//     if (selectedHour !== null && selectedMinute !== null && selectedPeriod !== null) {
//       // All values are selected, close the popup
//       setPopupVisible(false);
//     } else {
//       // Popup should not close until all values are selected
//       // You can add your custom logic here (e.g., show a message)
//     }
//   };

//   return (
//     <div>
//       <TimePicker
//         ref={pickerRef}
//         showSecond={false}
//         defaultValue={now}
//         className="xxx"
//         value={value}
//         onChange={onChange}
//         format={format}
//         use12Hours
//         inputReadOnly
//         placeholder="Select Time"
//         open={popupVisible}
//         onOpen={handleOpenPopup}
//         onClose={handleClosePopup}
//       />
//       {popupVisible && (
//         <div>
//           <select
//             value={selectedHour}
//             onChange={(e) => setSelectedHour(parseInt(e.target.value))}
//           >
//             {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
//               <option key={hour} value={hour}>
//                 {hour}
//               </option>
//             ))}
//           </select>
//           <select
//             value={selectedMinute}
//             onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
//           >
//             {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
//               <option key={minute} value={minute}>
//                 {minute < 10 ? `0${minute}` : minute}
//               </option>
//             ))}
//           </select>
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//           >
//             <option value="AM">AM</option>
//             <option value="PM">PM</option>
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Timepicker;

// import React, { useState, useRef } from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import '../Custom.css'; 

// export default function BasicTimePicker() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['TimePicker']}>
//         <TimePicker label="Estimated Time of Arrival"  className="custom-timepicker"/>
        
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
import React, { useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import '../Custom.css';


export default function BasicTimePicker() {
  useEffect(() => {
    // Remove outline from MuiOutlinedInput-notchedOutline
    const notchedOutline = document.querySelector('.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline');
    if (notchedOutline) {
      notchedOutline.style.outline = 'none';
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker />
      </DemoContainer>
    </LocalizationProvider>
  );
}









