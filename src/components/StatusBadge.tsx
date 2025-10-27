import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "pendente" | "em_avaliacao" | "aprovada" | "reprovada";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    pendente: {
      label: "Pendente",
      className: "bg-muted text-muted-foreground",
    },
    em_avaliacao: {
      label: "Em Avaliação",
      className: "bg-primary text-primary-foreground",
    },
    aprovada: {
      label: "Aprovada",
      className: "bg-success text-success-foreground",
    },
    reprovada: {
      label: "Reprovada",
      className: "bg-destructive text-destructive-foreground",
    },
  };

  const config = statusConfig[status];

  return <Badge className={config.className}>{config.label}</Badge>;
};
