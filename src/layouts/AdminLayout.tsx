import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { 
  LayoutDashboard, 
  Rocket, 
  Users, 
  ClipboardList, 
  Trophy,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminLayout = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/startups", icon: Rocket, label: "Startups" },
    { path: "/admin/avaliadores", icon: Users, label: "Avaliadores" },
    { path: "/admin/criterios", icon: ClipboardList, label: "Critérios" },
    { path: "/admin/ranking", icon: Trophy, label: "Ranking" },
    { path: "/admin/emails", icon: Mail, label: "E-mails" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated userRole="admin" onLogout={onLogout} />
      
      <div className="flex">
        <aside className="w-64 min-h-[calc(100vh-73px)] bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "hover:bg-sidebar-accent/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
