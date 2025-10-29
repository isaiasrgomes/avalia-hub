import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { inscreverStartup } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Inscricao = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    descricao: "",
    area: "",
    pitchDeckUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const areas = [
    "Inteligência Artificial",
    "Sustentabilidade",
    "Saúde",
    "Educação",
    "FinTech",
    "AgTech",
    "E-commerce",
    "Logística",
    "Outro",
  ];

  const calcularProgresso = () => {
    const campos = Object.values(formData);
    const preenchidos = campos.filter((v) => v !== "").length;
    return (preenchidos / campos.length) * 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar prazo (simular)
    const prazo = new Date("2025-11-28");
    const hoje = new Date();
    
    if (hoje > prazo) {
      toast.error("Prazo de inscrições encerrado!");
      return;
    }

    setLoading(true);

    try {
      await inscreverStartup(formData);
      setSuccess(true);
      toast.success("Inscrição realizada com sucesso!");
      
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Erro ao realizar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card>
              <CardContent className="pt-12 pb-8">
                <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10 text-success-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Inscrição Enviada!</h2>
                <p className="text-muted-foreground mb-6">
                  Recebemos sua inscrição. Você receberá um e-mail de confirmação em breve.
                </p>
                <Button onClick={() => navigate("/")} className="w-full">
                  Voltar para Home
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Inscrição de Startup</CardTitle>
              <CardDescription>
                Preencha todos os campos para se inscrever no programa
              </CardDescription>
              <div className="pt-4">
                <Progress value={calcularProgresso()} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {calcularProgresso().toFixed(0)}% completo
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Startup *</Label>
                  <Input
                    id="nome"
                    placeholder="Ex: TechVision AI"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail de Contato *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@startup.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Área de Atuação *</Label>
                  <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição do Projeto *</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva sua startup e o problema que ela resolve..."
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitchDeckUrl">Link do Pitch Deck *</Label>
                  <Input
                    id="pitchDeckUrl"
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={formData.pitchDeckUrl}
                    onChange={(e) => setFormData({ ...formData, pitchDeckUrl: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Compartilhe um link público para seu pitch deck (Google Drive, Dropbox, etc.)
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Inscrição"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
