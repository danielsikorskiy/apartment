import { ViewingCalendar } from "../components/calendar/ViewingCalendar";

export function CalendarPage() {
  return (
    <>
      <div className="app-header">
        <h1>Viewings</h1>
      </div>
      <ViewingCalendar />
    </>
  );
}
