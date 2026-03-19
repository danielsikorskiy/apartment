import type { Apartment, ApartmentDatabase } from "../types/apartment";

const STORAGE_KEY = "apartment-hunt-data";

export function loadFromLocalStorage(): Apartment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as Apartment[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveToLocalStorage(apartments: Apartment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apartments));
}

export function mergeApartments(
  remote: Apartment[],
  local: Apartment[]
): Apartment[] {
  const merged = new Map<string, Apartment>();

  for (const apt of remote) {
    merged.set(apt.id, apt);
  }

  for (const apt of local) {
    const existing = merged.get(apt.id);
    if (!existing) {
      merged.set(apt.id, apt);
    } else {
      const localTime = new Date(apt.dateUpdated).getTime();
      const remoteTime = new Date(existing.dateUpdated).getTime();
      if (localTime > remoteTime) {
        merged.set(apt.id, apt);
      }
    }
  }

  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}

export function exportAsJson(apartments: Apartment[]): void {
  const db: ApartmentDatabase = {
    apartments,
    lastUpdated: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(db, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "apartments.json";
  a.click();
  URL.revokeObjectURL(url);
}
