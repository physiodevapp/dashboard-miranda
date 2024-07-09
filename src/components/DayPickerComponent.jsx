import { useEffect, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const DayPickerComponent = ({startDate, onChangeDate}) => {
  const [currentDate, setCurrentDate] = useState(startDate)
  const [currentMonth, setCurrentMonth] = useState(startDate);

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const handleDateChange = (date) => {
    setCurrentDate(date)
  }

  useEffect(() => {
    onChangeDate(currentDate)
  
  }, [currentDate])
  

  return (
    <div>
      <DayPicker
        mode='single'
        month={currentMonth}
        onMonthChange={handleMonthChange}
        selected={currentDate}
        onSelect={handleDateChange}
      />
    </div>
  );
};