import { useState, useRef, useEffect } from "react";
import type { ApartmentStatus } from "../../types/apartment";

const statuses: { value: ApartmentStatus; label: string; color: string }[] = [
  { value: "interesting", label: "Interesting", color: "var(--status-interesting)" },
  { value: "ask_to_see", label: "Ask to See", color: "var(--status-ask-to-see)" },
  { value: "seeing", label: "Schedule Viewing", color: "var(--status-seeing)" },
  { value: "not_interesting", label: "Not Interesting", color: "var(--status-not-interesting)" },
];

interface Props {
  currentStatus: ApartmentStatus;
  onChange: (status: ApartmentStatus) => void;
}

export function StatusDropdown({ currentStatus, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  return (
    <div className="status-dropdown-wrapper" ref={ref}>
      <button
        className="btn-icon"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        aria-label="Change status"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </button>
      {open && (
        <div className="status-dropdown">
          {statuses.map((s) => (
            <button
              key={s.value}
              className={`status-dropdown-item${s.value === currentStatus ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                if (s.value !== currentStatus) {
                  onChange(s.value);
                }
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: s.color,
                  flexShrink: 0,
                }}
              />
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
