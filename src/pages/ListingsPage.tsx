import { useState } from "react";
import { useApartments } from "../hooks/useApartments";
import { ApartmentList } from "../components/apartments/ApartmentList";
import { AddApartmentForm } from "../components/forms/AddApartmentForm";
import { exportAsJson } from "../utils/storage";
import { useApartmentStore } from "../store/useApartmentStore";

export function ListingsPage() {
  const { active } = useApartments();
  const apartments = useApartmentStore((s) => s.apartments);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <div className="app-header">
        <div>
          <h1>Apartment Hunt</h1>
          <p className="page-subtitle">TLV Old North &middot; {active.length} listings</p>
        </div>
        <div className="app-header-actions">
          <button
            className="export-btn"
            onClick={() => exportAsJson(apartments)}
            title="Export as JSON"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>
      <ApartmentList
        apartments={active}
        emptyTitle="No apartments yet"
        emptyText="Add your first apartment or let an agent find listings for you."
      />
      <button className="fab" onClick={() => setShowAdd(true)} aria-label="Add apartment">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      {showAdd && <AddApartmentForm onClose={() => setShowAdd(false)} />}
    </>
  );
}
