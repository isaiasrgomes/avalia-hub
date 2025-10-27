import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { obterStartup, listarCriterios, salvarAvaliacao } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

interface AvaliacaoProps {
  userId: string;
}

export const Avaliacao = ({ userId }: AvaliacaoProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState<any>(null);
  const [criterios, setCriterios] = useState<any[]>([]);
  const [notas, setNotas] = useState<Record<string, number>>({});
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      if (id) {
        const st = await obterStartup(id);
        setStartup(st);
        
        const crit = await listarCriterios();
        setCriterios(crit);
        
        // Inicializar notas com 5
        const notasIniciais: Record<string, number> = {};
        crit.forEach((c) => {
          notasIniciais[c.id] = 5;
        });
        setNotas(notasIniciais);
      }
    };
    carregarDados();
  }, [id]);

  const handleSalvar = async () => {
    if (!comentario.trim()) {
      toast.error("Por favor, adicione um comentário");
      return;
    }

    setEnviando(true);
    try {
      await salvarAvaliacao({
        startupId: id!,
        avaliadorId: userId,
        notas,
        comentario,
      });
      toast.success("Avaliação salva com sucesso!");
      navigate("/avaliador");
    } catch (error) {
      toast.error("Erro ao salvar avaliação");
    } finally {
      setEnviando(false);
    }
  };

  if (!startup) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/avaliador")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-2">Avaliar Startup</h1>
        <p className="text-muted-foreground mb-8">
          {startup.nome} - {startup.area}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Critérios de Avaliação</CardTitle>
              <CardDescription>
                Atribua uma nota de 0 a 10 para cada critério
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {criterios.map((criterio) => (
                <div key={criterio.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">
                      {criterio.nome}
                      <span className="text-sm text-muted-foreground ml-2">
                        (Peso: {criterio.peso}%)
                      </span>
                    </Label>
                    <span className="text-2xl font-bold text-primary">
                      {notas[criterio.id]}
                    </span>
                  </div>
                  <Slider
                    value={[notas[criterio.id]]}
                    onValueChange={(value) =>
                      setNotas({ ...notas, [criterio.id]: value[0] })
                    }
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comentário</CardTitle>
              <CardDescription>
                Adicione observações sobre sua avaliação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escreva seus comentários sobre a startup..."
                rows={6}
                className="w-full"
              />
            </CardContent>
          </Card>

          <Button
            onClick={handleSalvar}
            disabled={enviando}
            className="w-full"
            size="lg"
          >
            <Save className="h-5 w-5 mr-2" />
            {enviando ? "Salvando..." : "Salvar Avaliação"}
          </Button>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações da Startup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-sm text-muted-foreground">{startup.descricao}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Área</h3>
                <p className="text-sm">{startup.area}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pitch Deck</h3>
                <a
                  href={startup.pitchDeckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Abrir Documento →
                </a>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data de Inscrição</h3>
                <p className="text-sm">
                  {new Date(startup.dataInscricao).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
