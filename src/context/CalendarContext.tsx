import React, { createContext, useContext, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

type CalendarContextType = {
    currentMonth: Date;
    nextMonth: () => void;
    prevMonth: () => void;
    setMonth: (date: Date) => void;
};

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode}> = ({ children}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
    const prevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
    const setMonth = (date: Date) => setCurrentMonth(date);

    return (
        <>
            <CalendarContext.Provider value={{ currentMonth, nextMonth, prevMonth, setMonth }}>
                {children}
            </CalendarContext.Provider>
        </>
    )
}

export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar must be used within a CalendarProvider");
    }
    return context;
}