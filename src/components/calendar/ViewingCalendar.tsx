import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { useApartments } from "../../hooks/useApartments";
import type { Apartment } from "../../types/apartment";

export function ViewingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { viewings } = useApartments();

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const start = startOfWeek(monthStart);
    const end = endOfWeek(monthEnd);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const viewingsByDate = useMemo(() => {
    const map = new Map<string, Apartment[]>();
    for (const v of viewings) {
      if (v.viewing?.date) {
        const key = v.viewing.date;
        const arr = map.get(key) || [];
        arr.push(v);
        map.set(key, arr);
      }
    }
    return map;
  }, [viewings]);

  const selectedViewings = selectedDate
    ? viewingsByDate.get(format(selectedDate, "yyyy-MM-dd")) || []
    : [];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2 className="calendar-month">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="calendar-nav">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} aria-label="Previous month">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} aria-label="Next month">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const hasViewing = viewingsByDate.has(dateKey);
          const inMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={dateKey}
              className={[
                "calendar-day",
                !inMonth && "other-month",
                isToday(day) && "today",
                hasViewing && "has-viewing",
              ]
                .filter(Boolean)
                .join(" ")}
              style={isSelected ? { background: "var(--bg-tertiary)" } : undefined}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, "d")}
              {hasViewing && <span className="calendar-day-dot" />}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="calendar-event-list">
          {selectedViewings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "var(--space-6)", color: "var(--text-tertiary)", fontSize: "0.85rem" }}>
              No viewings on {format(selectedDate, "MMMM d")}
            </div>
          ) : (
            selectedViewings.map((apt) => (
              <div key={apt.id} className="calendar-event-card">
                <div className="calendar-event-time">
                  {apt.viewing!.time}
                </div>
                <div className="calendar-event-address">{apt.address}</div>
                <div className="calendar-event-contact">
                  {apt.price.toLocaleString()} ILS &middot; {apt.rooms} rooms
                  {apt.viewing!.contactName && ` &middot; ${apt.viewing!.contactName}`}
                  {apt.viewing!.contactPhone && ` (${apt.viewing!.contactPhone})`}
                </div>
                {apt.viewing!.notes && (
                  <div className="calendar-event-notes">{apt.viewing!.notes}</div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {viewings.length === 0 && !selectedDate && (
        <div className="empty-state" style={{ paddingTop: "var(--space-8)" }}>
          <div className="empty-state-icon" style={{ fontSize: "2.5rem" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="empty-state-title">No viewings scheduled</div>
          <div className="empty-state-text">
            When you schedule apartment viewings, they'll appear here on the calendar.
          </div>
        </div>
      )}
    </div>
  );
}
