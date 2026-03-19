import { useMemo } from "react";
import { useApartmentStore } from "../store/useApartmentStore";

export function useApartments() {
  const apartments = useApartmentStore((s) => s.apartments);

  const active = useMemo(
    () => apartments.filter((a) => a.status !== "not_interesting"),
    [apartments]
  );

  const archived = useMemo(
    () => apartments.filter((a) => a.status === "not_interesting"),
    [apartments]
  );

  const viewings = useMemo(
    () => apartments.filter((a) => a.status === "seeing" && a.viewing),
    [apartments]
  );

  return { all: apartments, active, archived, viewings };
}
