
import { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <WeatherContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </WeatherContext.Provider>
  );
};


