import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useApartments } from "../../hooks/useApartments";
import type { Apartment, ApartmentStatus } from "../../types/apartment";
import "../../styles/map.css";

const statusColors: Record<ApartmentStatus, string> = {
  interesting: "#D4A574",
  not_interesting: "#B5B0A8",
  ask_to_see: "#C47D5E",
  seeing: "#7BA77B",
};

export function ApartmentMap() {
  const { active, archived } = useApartments();
  const [showArchived, setShowArchived] = useState(false);

  const apartments = showArchived ? [...active, ...archived] : active;

  return (
    <div className="map-container" style={{ height: "calc(100dvh - 72px)" }}>
      <button
        className={`map-toggle${showArchived ? " active" : ""}`}
        onClick={() => setShowArchived(!showArchived)}
      >
        {showArchived ? "Hide" : "Show"} Archived
      </button>
      <MapContainer
        center={[32.093, 34.781]}
        zoom={15}
        minZoom={13}
        maxZoom={18}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {apartments.map((apt) => (
          <ApartmentMarker key={apt.id} apartment={apt} />
        ))}
      </MapContainer>
    </div>
  );
}

function ApartmentMarker({ apartment }: { apartment: Apartment }) {
  const color = statusColors[apartment.status];
  return (
    <CircleMarker
      center={[apartment.lat, apartment.lng]}
      radius={10}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.7,
        weight: 2,
        opacity: 0.9,
      }}
    >
      <Popup>
        <div className="map-popup">
          <div className="map-popup-price">
            {apartment.price.toLocaleString()} ILS
          </div>
          <div className="map-popup-address">{apartment.address}</div>
          <div className="map-popup-meta">
            {apartment.rooms} rooms &middot; {apartment.sizeM2} m&sup2; &middot; Floor {apartment.floor}
          </div>
          <a
            href={apartment.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.75rem", marginTop: 6, display: "inline-block" }}
          >
            View listing &rarr;
          </a>
        </div>
      </Popup>
    </CircleMarker>
  );
}
