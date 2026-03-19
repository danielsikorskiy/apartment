import { Outlet } from "react-router-dom";
import { TabBar } from "./TabBar";

export function AppShell() {
  return (
    <div className="app-shell">
      <TabBar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
