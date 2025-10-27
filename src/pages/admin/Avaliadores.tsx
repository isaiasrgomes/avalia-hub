import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listarAvaliadores, adicionarAvaliador, listarStartups, atribuirStartup } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, UserPlus } from "lucide-react";

export const AdminAvaliadores = () => {
  const [avaliadores, setAvaliadores] = useState<any[]>([]);
  const [startups, setStartups] = useState<any[]>([]);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogAtribuir, setDialogAtribuir] = useState(false);
  const [avaliadorSelecionado, setAvaliadorSelecionado] = useState("");
  const [startupSelecionada, setStartupSelecionada] = useState("");
  const [novoAvaliador, setNovoAvaliador] = useState({
    nome: "",
    email: "",
    especializacao: "",
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const avs = await listarAvaliadores();
    setAvaliadores(avs);
    const sts = await listarStartups();
    setStartups(sts);
  };

  const handleAdicionar = async () => {
    await adicionarAvaliador(novoAvaliador);
    toast.success("Avaliador adicionado!");
    setDialogAberto(false);
    setNovoAvaliador({ nome: "", email: "", especializacao: "" });
    carregarDados();
  };

  const handleAtribuir = async () => {
    if (avaliadorSelecionado && startupSelecionada) {
      await atribuirStartup(avaliadorSelecionado, startupSelecionada);
      toast.success("Startup atribuída!");
      setDialogAtribuir(false);
      setAvaliadorSelecionado("");
      setStartupSelecionada("");
      carregarDados();
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Avaliadores</h1>
          <p className="text-muted-foreground">
            Adicione avaliadores e atribua startups
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setDialogAberto(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Avaliador
          </Button>
          <Button variant="outline" onClick={() => setDialogAtribuir(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Atribuir Startup
          </Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avaliadores.map((avaliador, index) => (
          <motion.div
            key={avaliador.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{avaliador.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{avaliador.email}</p>
                  <p>
                    <span className="font-medium">Especialização:</span>{" "}
                    {avaliador.especializacao}
                  </p>
                  <p>
                    <span className="font-medium">Startups atribuídas:</span>{" "}
                    {avaliador.startupsAtribuidas.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Avaliador</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={novoAvaliador.nome}
                onChange={(e) =>
                  setNovoAvaliador({ ...novoAvaliador, nome: e.target.value })
                }
                placeholder="Nome completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={novoAvaliador.email}
                onChange={(e) =>
                  setNovoAvaliador({ ...novoAvaliador, email: e.target.value })
                }
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="especializacao">Especialização</Label>
              <Input
                id="especializacao"
                value={novoAvaliador.especializacao}
                onChange={(e) =>
                  setNovoAvaliador({ ...novoAvaliador, especializacao: e.target.value })
                }
                placeholder="Área de expertise"
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

      <Dialog open={dialogAtribuir} onOpenChange={setDialogAtribuir}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atribuir Startup a Avaliador</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Avaliador</Label>
              <Select value={avaliadorSelecionado} onValueChange={setAvaliadorSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um avaliador" />
                </SelectTrigger>
                <SelectContent>
                  {avaliadores.map((av) => (
                    <SelectItem key={av.id} value={av.id}>
                      {av.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Startup</Label>
              <Select value={startupSelecionada} onValueChange={setStartupSelecionada}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma startup" />
                </SelectTrigger>
                <SelectContent>
                  {startups.map((st) => (
                    <SelectItem key={st.id} value={st.id}>
                      {st.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAtribuir(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAtribuir}>Atribuir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
