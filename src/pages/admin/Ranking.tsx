import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { listarStartups } from "@/services/api";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export const AdminRanking = () => {
  const [startups, setStartups] = useState<any[]>([]);

  useEffect(() => {
    const carregarStartups = async () => {
      const data = await listarStartups();
      const comNota = data
        .filter((s) => s.notaMedia !== undefined)
        .sort((a, b) => (b.notaMedia || 0) - (a.notaMedia || 0));
      setStartups(comNota);
    };
    carregarStartups();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Ranking de Startups</h1>
        <p className="text-muted-foreground mb-8">
          Classificação das startups por nota média
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Classificação Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Posição</TableHead>
                <TableHead>Nome da Startup</TableHead>
                <TableHead>Área</TableHead>
                <TableHead className="text-center">Nota Média</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {startups.map((startup, index) => (
                <TableRow key={startup.id}>
                  <TableCell className="font-bold text-lg">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && `${index + 1}º`}
                  </TableCell>
                  <TableCell className="font-medium">{startup.nome}</TableCell>
                  <TableCell>{startup.area}</TableCell>
                  <TableCell className="text-center">
                    <span className="text-lg font-semibold text-primary">
                      {startup.notaMedia?.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={startup.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
