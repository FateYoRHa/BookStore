import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-muted">
        <Outlet />
      </div>
    </>
  );
}
