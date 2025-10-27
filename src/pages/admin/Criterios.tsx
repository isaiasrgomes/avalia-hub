import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { listarCriterios, adicionarCriterio } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export const AdminCriterios = () => {
  const [criterios, setCriterios] = useState<any[]>([]);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [novoCriterio, setNovoCriterio] = useState({
    nome: "",
    peso: 0,
  });

  useEffect(() => {
    carregarCriterios();
  }, []);

  const carregarCriterios = async () => {
    const data = await listarCriterios();
    setCriterios(data);
  };

  const handleAdicionar = async () => {
    await adicionarCriterio(novoCriterio);
    toast.success("Critério adicionado!");
    setDialogAberto(false);
    setNovoCriterio({ nome: "", peso: 0 });
    carregarCriterios();
  };

  const pesoTotal = criterios.reduce((sum, c) => sum + c.peso, 0);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Critérios de Avaliação</h1>
          <p className="text-muted-foreground">
            Gerencie os critérios usados na avaliação das startups
          </p>
        </div>
        <Button onClick={() => setDialogAberto(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Critério
        </Button>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Critérios Ativos</span>
            <span className="text-sm font-normal text-muted-foreground">
              Peso Total: {pesoTotal}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Critério</TableHead>
                <TableHead className="text-right">Peso (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criterios.map((criterio) => (
                <TableRow key={criterio.id}>
                  <TableCell className="font-medium">{criterio.nome}</TableCell>
                  <TableCell className="text-right">{criterio.peso}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Critério</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Critério</Label>
              <Input
                id="nome"
                value={novoCriterio.nome}
                onChange={(e) =>
                  setNovoCriterio({ ...novoCriterio, nome: e.target.value })
                }
                placeholder="Ex: Escalabilidade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peso">Peso (%)</Label>
              <Input
                id="peso"
                type="number"
                min="0"
                max="100"
                value={novoCriterio.peso}
                onChange={(e) =>
                  setNovoCriterio({ ...novoCriterio, peso: Number(e.target.value) })
                }
                placeholder="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdicionar}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
