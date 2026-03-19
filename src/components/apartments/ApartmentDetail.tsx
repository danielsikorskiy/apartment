import { useState } from "react";
import type { Apartment, ApartmentStatus } from "../../types/apartment";
import { StatusDropdown } from "../forms/StatusDropdown";
import { ScheduleViewingForm } from "../forms/ScheduleViewingForm";
import { useApartmentStore } from "../../store/useApartmentStore";
import { format } from "date-fns";

interface Props {
  apartment: Apartment;
  onClose: () => void;
}

export function ApartmentDetail({ apartment, onClose }: Props) {
  const [showSchedule, setShowSchedule] = useState(false);
  const updateStatus = useApartmentStore((s) => s.updateStatus);

  const handleStatusChange = (status: ApartmentStatus) => {
    if (status === "seeing") {
      setShowSchedule(true);
    } else {
      updateStatus(apartment.id, status);
    }
  };

  return (
    <>
      <div className="detail-overlay" onClick={onClose}>
        <div className="detail-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="detail-sheet-handle" />
          {apartment.imageUrl ? (
            <img
              className="detail-image"
              src={apartment.imageUrl}
              alt={apartment.address}
            />
          ) : (
            <div className="detail-image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          )}
          <div className="detail-content">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div className="detail-price">{apartment.price.toLocaleString()} ILS/mo</div>
                <div className="detail-address">{apartment.address}</div>
              </div>
              <StatusDropdown
                currentStatus={apartment.status}
                onChange={handleStatusChange}
              />
            </div>

            <div className="detail-meta-grid">
              <div className="detail-meta-item">
                <div className="detail-meta-value">{apartment.rooms}</div>
                <div className="detail-meta-label">Rooms</div>
              </div>
              <div className="detail-meta-item">
                <div className="detail-meta-value">{apartment.sizeM2}</div>
                <div className="detail-meta-label">m&sup2;</div>
              </div>
              <div className="detail-meta-item">
                <div className="detail-meta-value">
                  {apartment.floor}{apartment.totalFloors ? `/${apartment.totalFloors}` : ""}
                </div>
                <div className="detail-meta-label">Floor</div>
              </div>
            </div>

            {apartment.status === "seeing" && apartment.viewing && (
              <div className="detail-section">
                <div className="detail-section-title">Scheduled Viewing</div>
                <div className="detail-viewing-card">
                  <div className="detail-viewing-date">
                    {format(new Date(apartment.viewing.date), "EEEE, MMMM d")} at {apartment.viewing.time}
                  </div>
                  {apartment.viewing.contactName && (
                    <div className="detail-viewing-info">
                      Contact: {apartment.viewing.contactName}
                      {apartment.viewing.contactPhone && ` (${apartment.viewing.contactPhone})`}
                    </div>
                  )}
                  {apartment.viewing.notes && (
                    <div className="detail-viewing-info" style={{ fontStyle: "italic" }}>
                      {apartment.viewing.notes}
                    </div>
                  )}
                </div>
              </div>
            )}

            {apartment.description && (
              <div className="detail-section">
                <div className="detail-section-title">Description</div>
                <div className="detail-description">{apartment.description}</div>
              </div>
            )}

            {apartment.highlights && apartment.highlights.length > 0 && (
              <div className="detail-section">
                <div className="detail-section-title">Highlights</div>
                <div className="apartment-card-highlights">
                  {apartment.highlights.map((h) => (
                    <span key={h} className="highlight-tag">{h}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-actions">
              <a
                href={apartment.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Original Post
              </a>
              <button className="btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSchedule && (
        <ScheduleViewingForm
          apartmentId={apartment.id}
          onClose={() => {
            setShowSchedule(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
