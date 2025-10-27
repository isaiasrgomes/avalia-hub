import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { listarStartups, obterStartup, atualizarStatusStartup, listarAvaliacoes, listarCriterios, type Startup } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, ExternalLink } from "lucide-react";

export const AdminStartups = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [criterios, setCriterios] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const data = await listarStartups();
    setStartups(data);
    const crit = await listarCriterios();
    setCriterios(crit);
  };

  const handleVerDetalhes = async (id: string) => {
    const startup = await obterStartup(id);
    if (startup) {
      setSelectedStartup(startup);
      const avs = await listarAvaliacoes(id);
      setAvaliacoes(avs);
      setDialogOpen(true);
    }
  };

  const handleAprovar = async () => {
    if (selectedStartup) {
      await atualizarStatusStartup(selectedStartup.id, "aprovada");
      toast.success("Startup aprovada!");
      setDialogOpen(false);
      carregarDados();
    }
  };

  const handleReprovar = async () => {
    if (selectedStartup) {
      await atualizarStatusStartup(selectedStartup.id, "reprovada");
      toast.error("Startup reprovada");
      setDialogOpen(false);
      carregarDados();
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Startups</h1>
        <p className="text-muted-foreground mb-8">
          Visualize e gerencie todas as startups inscritas
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Startups Inscritas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nota Média</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {startups.map((startup) => (
                <TableRow key={startup.id}>
                  <TableCell className="font-medium">{startup.nome}</TableCell>
                  <TableCell>{startup.email}</TableCell>
                  <TableCell>{startup.area}</TableCell>
                  <TableCell>
                    <StatusBadge status={startup.status} />
                  </TableCell>
                  <TableCell>
                    {startup.notaMedia ? startup.notaMedia.toFixed(1) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVerDetalhes(startup.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedStartup && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStartup.nome}</DialogTitle>
                <DialogDescription>Detalhes da startup</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Informações Gerais</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">E-mail:</span> {selectedStartup.email}
                    </p>
                    <p>
                      <span className="font-medium">Área:</span> {selectedStartup.area}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <StatusBadge status={selectedStartup.status} />
                    </p>
                    <p>
                      <span className="font-medium">Data de Inscrição:</span>{" "}
                      {new Date(selectedStartup.dataInscricao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-sm text-muted-foreground">{selectedStartup.descricao}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Pitch Deck</h3>
                  <a
                    href={selectedStartup.pitchDeckUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                  >
                    Abrir Pitch Deck <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {avaliacoes.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Avaliações ({avaliacoes.length})</h3>
                    {avaliacoes.map((av, idx) => (
                      <Card key={av.id} className="mb-4">
                        <CardContent className="pt-4">
                          <p className="text-sm font-medium mb-2">Avaliação #{idx + 1}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                            {criterios.map((crit) => (
                              <div key={crit.id} className="flex justify-between">
                                <span>{crit.nome}:</span>
                                <span className="font-medium">{av.notas[crit.id] || "-"}/10</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground italic mt-2">
                            "{av.comentario}"
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Fechar
                </Button>
                {selectedStartup.status !== "reprovada" && (
                  <Button variant="destructive" onClick={handleReprovar}>
                    Reprovar
                  </Button>
                )}
                {selectedStartup.status !== "aprovada" && (
                  <Button onClick={handleAprovar}>Aprovar</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
