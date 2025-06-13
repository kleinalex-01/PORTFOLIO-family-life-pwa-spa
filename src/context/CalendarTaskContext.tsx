import React, { createContext, useContext, useState } from 'react';

type Event = {
    date: string;
    title: string;
}

type TaskContextType = {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    addEvent: (event: Event) => void;
    removeEvent: (date: string) => void;
}

const CalendarTaskContext = createContext<TaskContextType | undefined>(undefined);

export const CalendarTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (event: Event) => {
        setEvents((prev) => [...prev, event]);
    };
    const removeEvent = (date: string) => {
        setEvents((prev) => prev.filter(event => event.date !== date));
    };

    return (
        <>
            <CalendarTaskContext.Provider value={{ events, setEvents, addEvent, removeEvent }}>
                {children}
            </CalendarTaskContext.Provider>
        </>
    )
}

export const useTask = () => {
    const context = useContext(CalendarTaskContext);
    if (!context) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
}
