import { useState } from "react";
import { useApartmentStore } from "../../store/useApartmentStore";
import type { ApartmentStatus } from "../../types/apartment";

interface Props {
  onClose: () => void;
}

export function AddApartmentForm({ onClose }: Props) {
  const addApartment = useApartmentStore((s) => s.addApartment);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [sizeM2, setSizeM2] = useState("");
  const [floor, setFloor] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [status, setStatus] = useState<ApartmentStatus>("interesting");
  const [lat, setLat] = useState("32.093");
  const [lng, setLng] = useState("34.781");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !price || !rooms || !sourceUrl) return;

    addApartment({
      address,
      price: Number(price),
      rooms: Number(rooms),
      sizeM2: Number(sizeM2) || 0,
      floor: Number(floor) || 0,
      totalFloors: totalFloors ? Number(totalFloors) : undefined,
      neighborhood: "Old North",
      lat: Number(lat),
      lng: Number(lng),
      sourceUrl,
      imageUrl: imageUrl || undefined,
      description: description || undefined,
      highlights: highlights ? highlights.split(",").map((h) => h.trim()).filter(Boolean) : undefined,
      status,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Apartment</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Address *</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nordau Blvd 42, Tel Aviv"
              required
            />
          </div>
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Price (ILS) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="7500"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Rooms *</label>
              <input
                type="number"
                step="0.5"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                placeholder="3"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Size (m&sup2;)</label>
              <input
                type="number"
                value={sizeM2}
                onChange={(e) => setSizeM2(e.target.value)}
                placeholder="75"
              />
            </div>
          </div>
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Floor</label>
              <input
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="3"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Total Floors</label>
              <input
                type="number"
                value={totalFloors}
                onChange={(e) => setTotalFloors(e.target.value)}
                placeholder="5"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ApartmentStatus)}>
                <option value="interesting">Interesting</option>
                <option value="ask_to_see">Ask to See</option>
                <option value="seeing">Seeing</option>
                <option value="not_interesting">Not Interesting</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Listing URL *</label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://www.yad2.co.il/item/..."
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bright apartment, recently renovated..."
              rows={2}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Highlights (comma-separated)</label>
            <input
              type="text"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="balcony, parking, renovated"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Add Apartment
          </button>
        </form>
      </div>
    </div>
  );
}
