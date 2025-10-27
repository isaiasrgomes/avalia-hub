import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { listarAvaliadores, listarStartups } from "@/services/api";
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

interface ListaStartupsProps {
  userId: string;
}

export const ListaStartups = ({ userId }: ListaStartupsProps) => {
  const [startups, setStartups] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarStartups = async () => {
      const avaliadores = await listarAvaliadores();
      const avaliador = avaliadores.find((a) => a.id === userId);
      
      if (avaliador) {
        const todasStartups = await listarStartups();
        const minhasStartups = todasStartups.filter((s) =>
          avaliador.startupsAtribuidas.includes(s.id)
        );
        setStartups(minhasStartups);
      }
    };
    carregarStartups();
  }, [userId]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Minhas Startups</h1>
        <p className="text-muted-foreground mb-8">
          Startups atribuídas para você avaliar
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg">{startup.nome}</CardTitle>
                <CardDescription>{startup.area}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {startup.descricao}
                </p>
                
                <div className="flex items-center justify-between">
                  <StatusBadge status={startup.status} />
                  {startup.notaMedia && (
                    <span className="text-sm font-semibold text-primary">
                      {startup.notaMedia.toFixed(1)}
                    </span>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => navigate(`/avaliador/avaliar/${startup.id}`)}
                >
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Avaliar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {startups.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-muted-foreground">
              Nenhuma startup atribuída ainda.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
