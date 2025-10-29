import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import { AdminLayout } from "@/layouts/AdminLayout";
import { AvaliadorLayout } from "@/layouts/AvaliadorLayout";
import { StartupLayout } from "@/layouts/StartupLayout";

// Páginas Públicas
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Inscricao } from "@/pages/Inscricao";
import NotFound from "@/pages/NotFound";

// Páginas Admin
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminStartups } from "@/pages/admin/Startups";
import { AdminAvaliadores } from "@/pages/admin/Avaliadores";
import { AdminCriterios } from "@/pages/admin/Criterios";
import { AdminRanking } from "@/pages/admin/Ranking";
import { AdminEmails } from "@/pages/admin/Emails";

// Páginas Avaliador
import { ListaStartups } from "@/pages/avaliador/ListaStartups";
import { Avaliacao } from "@/pages/avaliador/Avaliacao";

// Páginas Startup
import { PainelStartup } from "@/pages/startup/Painel";

import { User } from "@/services/api";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}

          <Route path={import.meta.env.BASE_URL} element={<Home />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/inscricao" element={<Inscricao />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Rotas Admin */}
            <Route
              path="/admin/*"
              element={
                user?.role === "admin" ? (
                  <AdminLayout onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="startups" element={<AdminStartups />} />
              <Route path="avaliadores" element={<AdminAvaliadores />} />
              <Route path="criterios" element={<AdminCriterios />} />
              <Route path="ranking" element={<AdminRanking />} />
              <Route path="emails" element={<AdminEmails />} />
            </Route>

            {/* Rotas Avaliador */}
            <Route
              path="/avaliador/*"
              element={
                user?.role === "avaliador" ? (
                  <AvaliadorLayout onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route index element={<ListaStartups userId={user?.id || ""} />} />
              <Route path="avaliar/:id" element={<Avaliacao userId={user?.id || ""} />} />
            </Route>

            {/* Rotas Startup */}
            <Route
              path="/startup/*"
              element={
                user?.role === "startup" ? (
                  <StartupLayout onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route index element={<PainelStartup userEmail={user?.email || ""} />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
