import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, LogOut } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: string;
  onLogout?: () => void;
}

export const Navbar = ({ isAuthenticated, userRole, onLogout }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Rocket className="h-8 w-8" />
            StartupHub
          </Link>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/inscricao">
                  <Button variant="ghost">Inscrever Startup</Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </>
            ) : (
              <Button variant="ghost" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
