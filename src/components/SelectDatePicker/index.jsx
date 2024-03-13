// // import React, { useState, useEffect } from 'react';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import { Placeholder } from 'react-bootstrap';
// import '../Custom.css'; // Adjust the path as needed
// // const Dob = ({ dob, onChange, placeholder }) => {
// //   const [selectedDate, setSelectedDate] = useState(dob);

// //   useEffect(() => {
// //     // Update the state when the dob prop changes
// //     setSelectedDate(dob);
// //   }, [dob]);

// //   const handleDateChange = (date) => {
// //     setSelectedDate(date);

// //     // Call the parent component's onChange function with the updated date
// //     onChange(date);
// //   };

// //   return (
// // <DatePicker
// //   selected={selectedDate}
// //   onChange={handleDateChange}
// //   selectsStart
// //   showMonthDropdown
// //   showYearDropdown
// //   placeholderText='' // Remove the placeholder
// //   dateFormat="yyyy-MM-dd"
// //   className="input  date-birth block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
// //   showTimeInput={false}
// //   popperClassName="light-popper"
// //   utcOffset={new Date().getTimezoneOffset()}
// //   yearDropdownItemNumber={200}  // Adjust the number of visible years as needed
// //   scrollableYearDropdown  // Enable scrollable year dropdown
// //   dropdownMode="scroll"
// //   popperModifiers={{
// //     offset: {
// //       enabled: true,
// //       offset: '0, 5' // Adjust the offset as needed
// //     },
// //     preventOverflow: {
// //       enabled: true,
// //       escapeWithReference: false,
// //       boundariesElement: 'viewport'
// //     },
// //     arrow: {
// //       enabled: false // Disable the arrow
// //     }
// //   }}


// // />

// //   );
// // };

// // export default Dob;
// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Placeholder } from 'react-bootstrap';

// const SelectDatePicker = ({ dob, onChange, placeholder }) => {
//   const [selectedDate, setSelectedDate] = useState(dob);

//   useEffect(() => {
//     // Update the state when the dob prop changes
//     setSelectedDate(dob);
//   }, [dob]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);

//     // Call the parent component's onChange function with the updated date
//     onChange(date);
//   };

//   return (
//     <div className="input block w-full placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-white-300 sm:text-sm sm:leading-6 border-2 border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-400 ">
// <DatePicker
//   selected={selectedDate}
//   onChange={handleDateChange}
//   selectsStart
//   showMonthDropdown
//   showYearDropdown
//   placeholderText={placeholder}
//   dateFormat="yyyy-MM-dd"
//   className="bg-transparent"
//   showTimeInput={false}
//   popperClassName="light-popper"
//   utcOffset={new Date().getTimezoneOffset()}
//   yearDropdownItemNumber={200}  // Adjust the number of visible years as needed
//   scrollableYearDropdown  // Enable scrollable year dropdown
//   dropdownMode="scroll"
//   popperModifiers={{
//         offset: {
//           enabled: true,
//           offset: '0, 5' // Adjust the offset as needed
//         },
//         preventOverflow: {
//           enabled: true,
//           escapeWithReference: false,
//           boundariesElement: 'viewport'
//         },
//         arrow: {
//           enabled: false // Disable the arrow
//         }
//       }}
// />
// </div>
//   );
// };

// export default SelectDatePicker;

// import React, { useState } from 'react';
// import '../Custom.css'; 

// const SelectDatePicker = () => {
//   const [selectedDay, setSelectedDay] = useState(''); // Initial day
//   const [selectedMonth, setSelectedMonth] = useState(''); // Initial month
//   const [selectedYear, setSelectedYear] = useState(''); // Initial year

//   const daysInMonth = (month, year) => {
//     return new Date(year, month, 0).getDate(); // Get the number of days in a month
//   };

//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Array of day names
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Array of month names
//   const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i); // Array of 10 years starting from 5 years ago

//   const handleDayChange = (e) => {
//     setSelectedDay(e.target.value);
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   const handleYearChange = (e) => {
//     setSelectedYear(e.target.value);
//   };

//   return (
//     <div className="input block w-full placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-white-300 sm:text-sm sm:leading-6 border-2 border-gray-600 rounded-md  py-1 text-gray-700 dark:text-gray-400 ">
//       <div className="flex space-x-5">
//         <select
//           value={selectedDay}
//           onChange={handleDayChange}
//           className="px-1 py-1 border-2 border-gray-600 rounded-md focus:outline-none text-sm   bg-transparent"
//         >
//           <option value="" disabled className="booking-date text-gray-500">Day</option>
//           {days.map((day, index) => (
//             <option key={index} value={day}>{day}</option>
//           ))}
//         </select>
//         <select
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           className="px-1 py-1 border-2 border-gray-600 rounded-md focus:outline-none text-sm text-white bg-transparent"
//         >
//           <option value="" disabled>Month</option>
//           {months.map((month, index) => (
//             <option key={index} value={month}>{month}</option>
//           ))}
//         </select>
//         <select
//           value={selectedYear}
//           onChange={handleYearChange}
//           className=" px-4 py-1 border-2 border-gray-600 rounded-md focus:outline-none text-sm text-white bg-transparent w-23"
//         >
//           <option value="" disabled>Year</option>
//           {years.map((year) => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default SelectDatePicker;

import React, { useState } from 'react';
import Select from 'react-select';
import '../Custom.css'; 

const SelectDatePicker = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({ label: day, value: day }));
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => ({ label: month, value: month }));
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => ({ label: year, value: year }));

  const handleDayChange = (selectedOption) => {
    setSelectedDay(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 'none',
       // Set background color to transparent
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Set color to white
    }),
  };

  return (
    <div className="input block w-full placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-white-300 sm:text-sm sm:leading-6 border-2 border-gray-600 rounded-md  text-gray-700 dark:text-gray-400 ">
      <div className="flex space-x-2">
        <Select
          value={selectedDay}
          onChange={handleDayChange}
          options={days}
          className=" rounded-md focus:outline-none text-sm"
          placeholder="Day"
          styles={customStyles}
        />
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          options={months}
          className=" rounded-md focus:outline-none text-sm"
          placeholder="Month"
          styles={customStyles}
        />
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          options={years}
          className=" rounded-md focus:outline-none text-sm w-23"
          placeholder="Year"
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default SelectDatePicker;



