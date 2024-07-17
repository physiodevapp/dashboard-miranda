import { useEffect, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DayPickerComponentProps {
  startDate: Date,
  onChangeDate: (date: Date) => void
}

export const DayPickerComponent = ({startDate, onChangeDate}: DayPickerComponentProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(startDate)
  const [currentMonth, setCurrentMonth] = useState<Date>(startDate);

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date)
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