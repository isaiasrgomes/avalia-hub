import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { listarStartups } from "@/services/api";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, FileText } from "lucide-react";

interface PainelProps {
  userEmail: string;
}

export const PainelStartup = ({ userEmail }: PainelProps) => {
  const [startup, setStartup] = useState<any>(null);

  useEffect(() => {
    const carregarStartup = async () => {
      const startups = await listarStartups();
      const minhaStartup = startups.find((s) => s.email === userEmail);
      setStartup(minhaStartup);
    };
    carregarStartup();
  }, [userEmail]);

  if (!startup) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Carregando...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusMessage = () => {
    switch (startup.status) {
      case "pendente":
        return {
          icon: Clock,
          title: "Inscrição Recebida",
          message: "Sua inscrição foi recebida e está aguardando análise. Em breve você receberá atualizações sobre o processo de avaliação.",
          color: "text-muted-foreground",
          bgColor: "bg-muted",
        };
      case "em_avaliacao":
        return {
          icon: FileText,
          title: "Em Avaliação",
          message: "Sua startup está sendo avaliada por nossos especialistas. Mantenha-se atento ao seu e-mail para atualizações.",
          color: "text-primary",
          bgColor: "bg-primary",
        };
      case "aprovada":
        return {
          icon: CheckCircle2,
          title: "Parabéns! Você foi aprovado!",
          message: "Sua startup foi aprovada para participar do programa de aceleração. Em breve você receberá as próximas etapas por e-mail. Parabéns pela conquista!",
          color: "text-success",
          bgColor: "bg-success",
        };
      case "reprovada":
        return {
          icon: XCircle,
          title: "Resultado da Avaliação",
          message: "Agradecemos seu interesse no programa. Infelizmente, sua startup não foi selecionada nesta edição. Continue desenvolvendo seu projeto e participe de futuras oportunidades!",
          color: "text-destructive",
          bgColor: "bg-destructive",
        };
    }
  };

  const statusInfo = getStatusMessage();
  const StatusIcon = statusInfo.icon;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Painel da Startup</h1>
        <p className="text-muted-foreground mb-8">
          Acompanhe o status da sua inscrição
        </p>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <div className={`mx-auto h-20 w-20 rounded-full ${statusInfo.bgColor} flex items-center justify-center mb-6`}>
                <StatusIcon className={`h-12 w-12 text-${statusInfo.bgColor === 'bg-muted' ? 'foreground' : 'white'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${statusInfo.color}`}>
                {statusInfo.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {statusInfo.message}
              </p>
              <StatusBadge status={startup.status} />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Informações da Inscrição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="font-medium">{startup.nome}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Área:</span>
                  <span className="font-medium">{startup.area}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Data de Inscrição:</span>
                  <span className="font-medium">
                    {new Date(startup.dataInscricao).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                {startup.notaMedia && (
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Nota Média:</span>
                    <span className="font-bold text-primary text-lg">
                      {startup.notaMedia.toFixed(1)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent>
                {startup.status === "pendente" && (
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Aguarde a análise inicial da sua inscrição</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Fique atento ao seu e-mail</span>
                    </li>
                  </ul>
                )}
                
                {startup.status === "em_avaliacao" && (
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Avaliadores estão analisando sua proposta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Os resultados serão divulgados em breve</span>
                    </li>
                  </ul>
                )}

                {startup.status === "aprovada" && (
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-1">✓</span>
                      <span>Aguarde o e-mail com as próximas etapas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-1">✓</span>
                      <span>Prepare-se para o programa de aceleração</span>
                    </li>
                  </ul>
                )}

                {startup.status === "reprovada" && (
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span>Continue desenvolvendo seu projeto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span>Participe de futuras edições</span>
                    </li>
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
