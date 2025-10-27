import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold text-foreground">Página não encontrada</h2>
        <p className="text-muted-foreground">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
