// import React from 'react'
// import DatePicker from 'tailwind-datepicker-react';
// import 'react-datepicker/dist/react-datepicker.css';

// function DatePicker({ selectedDate, handleChange }) {
//     return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={date => handleChange(date)}
//           dateFormat="yyyy/MM/dd"
//         />
//       );
// }

// export default DatePicker
// import React from 'react'
// import DatePicker from 'tailwind-datepicker-react';
// import 'react-datepicker/dist/react-datepicker.css';

// function DatePicker({ selectedDate, handleChange }) {
//     return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={date => handleChange(date)}
//           dateFormat="yyyy/MM/dd"
//         />
//       );
// }

// export default DatePicker
// EventDatePicker.js
// import React from 'react'
// import DatePicker from 'tailwind-datepicker-react';
// import 'react-datepicker/dist/react-datepicker.css';

// function DatePicker({ selectedDate, handleChange }) {
//     return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={date => handleChange(date)}
//           dateFormat="yyyy/MM/dd"
//         />
//       );
// }

// export default DatePicker
// EventDatePicker.js
// import React from 'react';
// import DatePicker from 'tailwind-datepicker-react';
// import 'react-datepicker/dist/react-datepicker.css';

// function DatePicker({ selectedDate, handleChange }) {
//   const CustomInputStartDate = ({ value, onClick }) => (
//     <input
//       type="text"
//       value={value}
//       onClick={onClick}
//       readOnly
//       placeholder="Start Date"
//       className="rounded-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
//     />
//   );
//   return (
//     <DatePicker
//       selected={selectedDate}
//       onChange={(date) => handleChange(date)}
//       dateFormat="yyyy/MM/dd"
//       customInput={<CustomInputStartDate />}
//     />
//   );
// }

// export default DatePicker;
// import React from 'react';
// import DatePicker from 'tailwind-datepicker-react';
// import 'react-datepicker/dist/react-datepicker.css';

// function DatePicker({ selectedDate, handleChange }) {
//   const CustomInputStartDate = ({ value, onClick }) => (
//     <button
//       onClick={onClick}
//       className="rounded-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
//     >
//       {value}
//     </button>
//   );
  
//   return (
//     <DatePicker
//       selected={selectedDate}
//       onChange={(date) => handleChange(date)}
//       dateFormat="yyyy/MM/dd"
//       customInput={<CustomInputStartDate value="Start Date" />}
//     />
//   );
// }

// export default DatePicker;
// import React from 'react';
// import DatePicker from 'tailwind-datepicker-react';
// import 'react-datepicker/dist/react-datepicker.css';

// function DatePicker({ selectedDate, handleChange }) {
//   const CustomInputStartDate = ({ value, onClick }) => (
//     <button
//       onClick={onClick}
//       className="rounded-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
//     >
//       {value}
//     </button>
//   );

//   return (
//     <DatePicker
//       selected={selectedDate}
//       onChange={(date) => handleChange(date)}
//       dateFormat="yyyy/MM/dd"
//       customInput={<CustomInputStartDate value="Select Date" />}
//     />
//   );
// }

// export default DatePicker;
// import React from 'react';
// import DatePicker from 'tailwind-datepicker-react';
// import 'react-datepicker/dist/react-datepicker.css';

// function CustomDatePicker({ selectedDate, handleChange }) {
//   return (
//     <DatePicker
//       selected={selectedDate}
//       onChange={(date) => handleChange(date)}
//       dateFormat="yyyy/MM/dd"
//       withPortal
//     />
//   );
// }

// export default CustomDatePicker;

// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const DateSelector = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <div className="flex justify-center items-center ">
//       <DatePicker
//         selected={selectedDate}
//         onChange={date => setSelectedDate(date)}
//         dateFormat="EEEE, MMM d, yyyy"
//         className="p-2 border border-gray-300 rounded-md text-gray-700"
//         placeholderText="Friday, Jun 10, 2024"
//       />
//     </div>
//   );
// };

// export default DateSelector;
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Custom.css'; // Adjust the path as needed

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex justify-center items-center ">
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="EEEE, MMM d, yyyy"
        className="p-2 border border-gray-300 rounded-md text-gray-700 "
        wrapperClassName="flex-none" // This class will prevent the input field from taking full width
        customInput={<CustomInput />} // Use a custom input component to render only the placeholder text
      
      />
    </div>
  );
};

const CustomInput = ({ value, onClick }) => (
  <div onClick={onClick} className="cursor-pointer">
    {value || 'Select a date'} {/* Display the selected date or placeholder text */}
  </div>
);

export default DateSelector;


