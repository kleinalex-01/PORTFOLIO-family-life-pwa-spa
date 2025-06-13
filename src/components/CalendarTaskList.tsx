import React, { useEffect } from 'react';
import { onValue } from 'firebase/database';
import { calendarRef } from '../FirebaseConfig';


export const CalendarTaskList: React.FC = () => {

    useEffect(() => {
        const unsubscribe = onValue(calendarRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                console.log("No tasks found");
                return;
            }
            const tasks = Object.entries(data).map(([, value]) => ({
                date: value.date,
                title: value.title,
            }));
            console.log("Tasks updated:", tasks);
        });

        return () => unsubscribe();
    }, [])
    
    return (
        <>
        
        </>
    )
}