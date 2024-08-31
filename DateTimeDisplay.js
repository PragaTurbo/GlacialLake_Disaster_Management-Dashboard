import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="date-time-display">
      <p>Date: {dateTime.toLocaleDateString()}</p>
      <p>Time: {dateTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default DateTimeDisplay;
