import { useState } from "react";
import type { Apartment } from "../../types/apartment";
import { ApartmentCard } from "./ApartmentCard";
import { ApartmentDetail } from "./ApartmentDetail";

interface Props {
  apartments: Apartment[];
  emptyIcon?: string;
  emptyTitle?: string;
  emptyText?: string;
}

export function ApartmentList({ apartments, emptyIcon, emptyTitle, emptyText }: Props) {
  const [selected, setSelected] = useState<Apartment | null>(null);

  if (apartments.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">{emptyIcon || "~"}</div>
        <div className="empty-state-title">{emptyTitle || "Nothing here yet"}</div>
        <div className="empty-state-text">{emptyText || "Apartments will appear here as they're added."}</div>
      </div>
    );
  }

  return (
    <>
      {apartments.map((apt, i) => (
        <ApartmentCard
          key={apt.id}
          apartment={apt}
          index={i}
          onClick={() => setSelected(apt)}
        />
      ))}
      {selected && (
        <ApartmentDetail
          apartment={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
