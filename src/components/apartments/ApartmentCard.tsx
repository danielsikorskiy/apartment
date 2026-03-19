import type { Apartment } from "../../types/apartment";
import { StatusBadge } from "./StatusBadge";
import { format } from "date-fns";

interface Props {
  apartment: Apartment;
  index: number;
  onClick: () => void;
}

export function ApartmentCard({ apartment, index, onClick }: Props) {
  const { price, rooms, sizeM2, floor, address, imageUrl, status, viewing, highlights } = apartment;

  return (
    <article
      className="apartment-card"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={onClick}
    >
      {imageUrl ? (
        <img
          className="apartment-card-image"
          src={imageUrl}
          alt={address}
          loading="lazy"
        />
      ) : (
        <div className="apartment-card-image-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
      )}
      <div className="apartment-card-body">
        <div className="apartment-card-price">
          {price.toLocaleString()} ILS
        </div>
        <div className="apartment-card-meta">
          <span>{rooms} rooms</span>
          <span>{sizeM2} m&sup2;</span>
          <span>Floor {floor}</span>
        </div>
        <div className="apartment-card-address">{address}</div>
        <div className="apartment-card-footer">
          <StatusBadge status={status} />
          {status === "seeing" && viewing && (
            <span style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
              {format(new Date(viewing.date), "MMM d")} at {viewing.time}
            </span>
          )}
        </div>
        {highlights && highlights.length > 0 && (
          <div className="apartment-card-highlights">
            {highlights.slice(0, 3).map((h) => (
              <span key={h} className="highlight-tag">{h}</span>
            ))}
            {highlights.length > 3 && (
              <span className="highlight-tag">+{highlights.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
