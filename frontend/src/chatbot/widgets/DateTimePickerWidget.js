import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import '../../App.css'


const DateTimePickerWidget = () => {
    const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className='p-5 datetime-picker-container'>
        <DateTimePicker onChange={setSelectedDate} value={selectedDate} />
        {/* console.log(selectedDate, setSelectedDate) */}
    </div>
  )
} 

export default DateTimePickerWidget