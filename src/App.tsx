import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ListingsPage } from "./pages/ListingsPage";
import { ArchivePage } from "./pages/ArchivePage";
import { MapPage } from "./pages/MapPage";
import { CalendarPage } from "./pages/CalendarPage";
import { useApartmentStore } from "./store/useApartmentStore";

export default function App() {
  const fetchApartments = useApartmentStore((s) => s.fetchApartments);
  const isLoading = useApartmentStore((s) => s.isLoading);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <span style={{ fontSize: "0.85rem" }}>Loading apartments...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
