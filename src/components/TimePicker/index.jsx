
import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const Timepicker = ({ value, onChange, placeholder, className }) => {
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const handleTimeChange = (time) => {
    // Call the onChange callback with the selected time
    onChange(time);

    // Close the TimePicker popup
    setTimePickerVisible(false);
  };

  const toggleTimePicker = () => {
    // Toggle the visibility of the TimePicker
    setTimePickerVisible(!timePickerVisible);
  };

  return (
    <div onClick={toggleTimePicker}>
      <TimePicker
        onChange={handleTimeChange}
        value={value ? moment(value) : null}
        showSecond={false}
        format="h:mm A"
        use12Hours
        placeholder={placeholder}
        className={`custom-timepicker ${className}`}
        open={timePickerVisible}
      />
    </div>
  );
};

export default Timepicker;
