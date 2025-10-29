import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Rocket, Calendar, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Acelere sua Startup
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Participe do nosso programa de aceleração e transforme sua ideia em realidade
            </p>
            <Link to="/inscricao">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Rocket className="mr-2 h-5 w-5" />
                Inscreva sua Startup
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Informações do Programa */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground">
              Um processo simples e transparente
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Rocket,
                title: "1. Inscreva-se",
                description: "Preencha o formulário com as informações da sua startup e envie seu pitch deck",
              },
              {
                icon: Users,
                title: "2. Avaliação",
                description: "Especialistas avaliarão sua proposta com base em critérios técnicos e de mercado",
              },
              {
                icon: Trophy,
                title: "3. Resultado",
                description: "Receba feedback detalhado e, se aprovado, participe do programa de aceleração",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prazos e Critérios */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-primary" />
                    <CardTitle>Cronograma</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Inscrições</span>
                    <span className="text-muted-foreground">Até 28/11/2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Avaliação</span>
                    <span className="text-muted-foreground">01/12 - 15/12</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Resultados</span>
                    <span className="text-muted-foreground">20/12/2025</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-primary" />
                    <CardTitle>Critérios de Avaliação</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Inovação</span>
                    <span className="text-muted-foreground">25%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Viabilidade</span>
                    <span className="text-muted-foreground">25%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Equipe</span>
                    <span className="text-muted-foreground">20%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Mercado + Impacto</span>
                    <span className="text-muted-foreground">30%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Não perca essa oportunidade de acelerar sua startup
            </p>
            <Link to="/inscricao">
              <Button size="lg" className="text-lg px-8 py-6">
                Inscrever Agora
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
