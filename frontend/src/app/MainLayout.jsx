import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}
