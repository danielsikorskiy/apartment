import type { ApartmentStatus } from "../../types/apartment";

const labels: Record<ApartmentStatus, string> = {
  interesting: "Interesting",
  not_interesting: "Not Interesting",
  ask_to_see: "Ask to See",
  seeing: "Seeing",
};

export function StatusBadge({ status }: { status: ApartmentStatus }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge-dot" />
      {labels[status]}
    </span>
  );
}
