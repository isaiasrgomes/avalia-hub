import { useEffect, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { obterMetricas } from "@/services/api";
import { Rocket, Users, ClipboardCheck, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";

export const AdminDashboard = () => {
  const [metricas, setMetricas] = useState({
    totalStartups: 0,
    totalAvaliadores: 0,
    totalAvaliacoes: 0,
    aprovadas: 0,
    reprovadas: 0,
  });

  useEffect(() => {
    const carregarMetricas = async () => {
      const data = await obterMetricas();
      setMetricas(data);
    };
    carregarMetricas();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Visão geral do programa de aceleração
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total de Startups"
          value={metricas.totalStartups}
          icon={Rocket}
          index={0}
        />
        <MetricCard
          title="Avaliadores"
          value={metricas.totalAvaliadores}
          icon={Users}
          index={1}
        />
        <MetricCard
          title="Avaliações Realizadas"
          value={metricas.totalAvaliacoes}
          icon={ClipboardCheck}
          index={2}
        />
        <MetricCard
          title="Startups Aprovadas"
          value={metricas.aprovadas}
          icon={ThumbsUp}
          index={3}
        />
        <MetricCard
          title="Startups Reprovadas"
          value={metricas.reprovadas}
          icon={ThumbsDown}
          index={4}
        />
      </div>
    </div>
  );
};
