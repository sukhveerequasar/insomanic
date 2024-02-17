import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Placeholder } from 'react-bootstrap';
import '../Custom.css'; // Adjust the path as needed
const Dob = ({ dob, onChange, placeholder }) => {
  const [selectedDate, setSelectedDate] = useState(dob);

  useEffect(() => {
    // Update the state when the dob prop changes
    setSelectedDate(dob);
  }, [dob]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Call the parent component's onChange function with the updated date
    onChange(date);
  };

  return (
<DatePicker
  selected={selectedDate}
  onChange={handleDateChange}
  selectsStart
  showMonthDropdown
  showYearDropdown
  placeholderText={placeholder}
  dateFormat="yyyy-MM-dd"
  className="input custom-input font-roboto date-birth"
  showTimeInput={false}
  popperClassName="light-popper"
  utcOffset={new Date().getTimezoneOffset()}
  yearDropdownItemNumber={200}  // Adjust the number of visible years as needed
  scrollableYearDropdown  // Enable scrollable year dropdown
  dropdownMode="scroll"
  popperModifiers={{
    offset: {
      enabled: true,
      offset: '0, 5' // Adjust the offset as needed
    },
    preventOverflow: {
      enabled: true,
      escapeWithReference: false,
      boundariesElement: 'viewport'
    },
    arrow: {
      enabled: false // Disable the arrow
    }
  }}
/>

  );
};

export default Dob;