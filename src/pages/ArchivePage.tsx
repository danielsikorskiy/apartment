import { useApartments } from "../hooks/useApartments";
import { ApartmentList } from "../components/apartments/ApartmentList";

export function ArchivePage() {
  const { archived } = useApartments();

  return (
    <>
      <div className="app-header">
        <div>
          <h1>Archive</h1>
          <p className="page-subtitle">{archived.length} passed on</p>
        </div>
      </div>
      <ApartmentList
        apartments={archived}
        emptyTitle="Archive is empty"
        emptyText="Apartments you mark as 'not interesting' will appear here."
      />
    </>
  );
}
