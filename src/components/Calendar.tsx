import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  isToday
} from 'date-fns';
import { useCalendar } from '../context/CalendarContext';
import { useTask } from '../context/CalendarTaskContext';

export const Calendar: React.FC = () => {
  const { currentMonth, nextMonth, prevMonth } = useCalendar();
  const { events } = useTask();

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const startWeekday = getDay(firstDayOfMonth);
  const blanks = Array.from({ length: startWeekday });
  const weekdays = ['Hét', 'Kedd', 'Szer', 'Csü', 'Pén', 'Szo', 'Vas'];

  return (
    <div className="container mt-4">
      {/* Naptár navigáicós sáv */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-light border" onClick={prevMonth}>◀</button>
        <h3 className="mb-0">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button className="btn btn-light border" onClick={nextMonth}>▶</button>
      </div>

      {/* Napok szövegesen grid-je */}
      <div className="calendar-grid fw-bold">
        {weekdays.map((day) => (
          <div key={day} className="calendar-cell calendar-header">
            {day}
          </div>
        ))}
      </div>

      {/* Naptár Grid */}
      <div className="calendar-grid">
        {/* Üres cellák */}
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="calendar-cell bg-light"></div>
        ))}

        {/* Napok megjelenítése */}
        {daysInMonth.map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const event = events.find((e) => e.date === dayStr);

          return (
            <div
              key={dayStr}
              className={`calendar-cell p-2 border ${isToday(day) ? 'bg-success text-white' : ''}`}
              onClick={() => {
                if (event) alert(`Esemény: ${event.title}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="fw-semibold">{format(day, 'd')}</div>
              {event && <div className="small text-danger mt-1">📌 {event.title}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
