import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { listarStartups, enviarEmail } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export const AdminEmails = () => {
  const [startups, setStartups] = useState<any[]>([]);
  const [startupSelecionada, setStartupSelecionada] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const carregarStartups = async () => {
      const data = await listarStartups();
      setStartups(data);
    };
    carregarStartups();
  }, []);

  const handleEnviarEmail = async (tipo: "aprovacao" | "reprovacao") => {
    if (!startupSelecionada) {
      toast.error("Selecione uma startup");
      return;
    }

    setEnviando(true);
    try {
      await enviarEmail(tipo, startupSelecionada);
      toast.success(`E-mail de ${tipo} enviado com sucesso!`);
      setStartupSelecionada("");
    } catch (error) {
      toast.error("Erro ao enviar e-mail");
    } finally {
      setEnviando(false);
    }
  };

  const startupsAprovadas = startups.filter((s) => s.status === "aprovada");
  const startupsReprovadas = startups.filter((s) => s.status === "reprovada");

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Envio de E-mails</h1>
        <p className="text-muted-foreground mb-8">
          Envie notificações de aprovação ou reprovação
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="border-success">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success flex items-center justify-center">
                  <Mail className="h-5 w-5 text-success-foreground" />
                </div>
                <div>
                  <CardTitle>E-mail de Aprovação</CardTitle>
                  <CardDescription>
                    Parabenize as startups aprovadas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Selecionar Startup Aprovada</Label>
                <Select value={startupSelecionada} onValueChange={setStartupSelecionada}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma startup" />
                  </SelectTrigger>
                  <SelectContent>
                    {startupsAprovadas.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={() => handleEnviarEmail("aprovacao")}
                disabled={enviando || !startupSelecionada}
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar E-mail de Aprovação
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="border-destructive">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive flex items-center justify-center">
                  <Mail className="h-5 w-5 text-destructive-foreground" />
                </div>
                <div>
                  <CardTitle>E-mail de Reprovação</CardTitle>
                  <CardDescription>
                    Notifique as startups não aprovadas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Selecionar Startup Reprovada</Label>
                <Select value={startupSelecionada} onValueChange={setStartupSelecionada}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma startup" />
                  </SelectTrigger>
                  <SelectContent>
                    {startupsReprovadas.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => handleEnviarEmail("reprovacao")}
                disabled={enviando || !startupSelecionada}
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar E-mail de Reprovação
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
