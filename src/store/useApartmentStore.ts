import { create } from "zustand";
import type { Apartment, ApartmentDatabase, ApartmentStatus, ApartmentViewing } from "../types/apartment";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  mergeApartments,
} from "../utils/storage";
import { generateId } from "../utils/ids";

interface ApartmentStore {
  apartments: Apartment[];
  isLoading: boolean;
  error: string | null;
  fetchApartments: () => Promise<void>;
  addApartment: (apt: Omit<Apartment, "id" | "dateAdded" | "dateUpdated" | "addedBy">) => void;
  updateApartment: (id: string, updates: Partial<Apartment>) => void;
  updateStatus: (id: string, status: ApartmentStatus, viewing?: ApartmentViewing) => void;
  deleteApartment: (id: string) => void;
}

export const useApartmentStore = create<ApartmentStore>((set, get) => ({
  apartments: [],
  isLoading: true,
  error: null,

  fetchApartments: async () => {
    try {
      const res = await fetch("/data/apartments.json");
      const data: ApartmentDatabase = await res.json();
      const local = loadFromLocalStorage();
      const merged = mergeApartments(data.apartments, local);
      saveToLocalStorage(merged);
      set({ apartments: merged, isLoading: false });
    } catch {
      const local = loadFromLocalStorage();
      if (local.length > 0) {
        set({ apartments: local, isLoading: false });
      } else {
        set({ error: "Failed to load apartments", isLoading: false });
      }
    }
  },

  addApartment: (apt) => {
    const now = new Date().toISOString();
    const newApt: Apartment = {
      ...apt,
      id: generateId(),
      dateAdded: now,
      dateUpdated: now,
      addedBy: "manual",
    };
    const updated = [newApt, ...get().apartments];
    saveToLocalStorage(updated);
    set({ apartments: updated });
  },

  updateApartment: (id, updates) => {
    const updated = get().apartments.map((apt) =>
      apt.id === id
        ? { ...apt, ...updates, dateUpdated: new Date().toISOString() }
        : apt
    );
    saveToLocalStorage(updated);
    set({ apartments: updated });
  },

  updateStatus: (id, status, viewing) => {
    const updates: Partial<Apartment> = { status };
    if (status === "seeing" && viewing) {
      updates.viewing = viewing;
    }
    if (status !== "seeing") {
      updates.viewing = undefined;
    }
    get().updateApartment(id, updates);
  },

  deleteApartment: (id) => {
    const updated = get().apartments.filter((apt) => apt.id !== id);
    saveToLocalStorage(updated);
    set({ apartments: updated });
  },
}));
