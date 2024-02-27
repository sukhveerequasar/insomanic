
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Custom.css'; // Adjust the path as needed

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="input block w-full placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-white-300 sm:text-sm sm:leading-6 border-2 border-gray-700 rounded-md px-4 py-2 text-gray-700 dark:text-gray-400 ">
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


