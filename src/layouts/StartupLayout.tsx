import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export const StartupLayout = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated userRole="startup" onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
