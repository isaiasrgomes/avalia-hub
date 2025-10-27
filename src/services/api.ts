// Mock API - Simulação de backend
export type UserRole = "admin" | "avaliador" | "startup";

export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
}

export interface Startup {
  id: string;
  nome: string;
  email: string;
  descricao: string;
  area: string;
  pitchDeckUrl: string;
  status: "pendente" | "em_avaliacao" | "aprovada" | "reprovada";
  dataInscricao: string;
  notaMedia?: number;
}

export interface Avaliador {
  id: string;
  nome: string;
  email: string;
  especializacao: string;
  startupsAtribuidas: string[];
}

export interface Criterio {
  id: string;
  nome: string;
  peso: number;
}

export interface Avaliacao {
  id: string;
  startupId: string;
  avaliadorId: string;
  notas: Record<string, number>;
  comentario: string;
  data: string;
}

// Dados simulados
let startups: Startup[] = [
  {
    id: "1",
    nome: "TechVision AI",
    email: "contato@techvision.com",
    descricao: "Plataforma de inteligência artificial para análise preditiva de mercado",
    area: "Inteligência Artificial",
    pitchDeckUrl: "https://example.com/pitch1.pdf",
    status: "em_avaliacao",
    dataInscricao: "2025-01-15",
    notaMedia: 8.5,
  },
  {
    id: "2",
    nome: "EcoSolutions",
    email: "hello@ecosolutions.com",
    descricao: "Soluções sustentáveis para gestão de resíduos urbanos",
    area: "Sustentabilidade",
    pitchDeckUrl: "https://example.com/pitch2.pdf",
    status: "pendente",
    dataInscricao: "2025-01-18",
  },
  {
    id: "3",
    nome: "HealthTrack",
    email: "info@healthtrack.com",
    descricao: "App de monitoramento de saúde com IA",
    area: "Saúde",
    pitchDeckUrl: "https://example.com/pitch3.pdf",
    status: "aprovada",
    dataInscricao: "2025-01-10",
    notaMedia: 9.2,
  },
];

let avaliadores: Avaliador[] = [
  {
    id: "1",
    nome: "Dr. Carlos Silva",
    email: "carlos@avaliador.com",
    especializacao: "Tecnologia e IA",
    startupsAtribuidas: ["1"],
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria@avaliador.com",
    especializacao: "Sustentabilidade",
    startupsAtribuidas: ["2"],
  },
];

let criterios: Criterio[] = [
  { id: "1", nome: "Inovação", peso: 25 },
  { id: "2", nome: "Viabilidade", peso: 25 },
  { id: "3", nome: "Equipe", peso: 20 },
  { id: "4", nome: "Mercado", peso: 20 },
  { id: "5", nome: "Impacto Social", peso: 10 },
];

let avaliacoes: Avaliacao[] = [
  {
    id: "1",
    startupId: "1",
    avaliadorId: "1",
    notas: { "1": 9, "2": 8, "3": 8, "4": 9, "5": 8 },
    comentario: "Excelente proposta com alto potencial de inovação",
    data: "2025-01-20",
  },
];

let users: User[] = [
  {
    id: "admin1",
    email: "admin@startuphub.com",
    nome: "Administrador",
    role: "admin",
  },
  {
    id: "1",
    email: "carlos@avaliador.com",
    nome: "Dr. Carlos Silva",
    role: "avaliador",
  },
  {
    id: "startup1",
    email: "contato@techvision.com",
    nome: "TechVision AI",
    role: "startup",
  },
];

// Helper para delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Funções de autenticação
export const login = async (email: string, senha: string): Promise<User> => {
  await delay(800);
  
  const user = users.find((u) => u.email === email);
  
  if (!user || senha !== "123456") {
    throw new Error("Credenciais inválidas");
  }
  
  return user;
};

// Funções de Startups
export const inscreverStartup = async (data: Omit<Startup, "id" | "status" | "dataInscricao">): Promise<Startup> => {
  await delay(1000);
  
  const novaStartup: Startup = {
    ...data,
    id: Date.now().toString(),
    status: "pendente",
    dataInscricao: new Date().toISOString().split("T")[0],
  };
  
  startups.push(novaStartup);
  return novaStartup;
};

export const listarStartups = async (): Promise<Startup[]> => {
  await delay(500);
  return startups;
};

export const obterStartup = async (id: string): Promise<Startup | undefined> => {
  await delay(300);
  return startups.find((s) => s.id === id);
};

export const atualizarStatusStartup = async (id: string, status: Startup["status"]): Promise<Startup> => {
  await delay(500);
  
  const index = startups.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Startup não encontrada");
  
  startups[index].status = status;
  return startups[index];
};

// Funções de Avaliadores
export const listarAvaliadores = async (): Promise<Avaliador[]> => {
  await delay(500);
  return avaliadores;
};

export const adicionarAvaliador = async (data: Omit<Avaliador, "id" | "startupsAtribuidas">): Promise<Avaliador> => {
  await delay(800);
  
  const novoAvaliador: Avaliador = {
    ...data,
    id: Date.now().toString(),
    startupsAtribuidas: [],
  };
  
  avaliadores.push(novoAvaliador);
  return novoAvaliador;
};

export const atribuirStartup = async (avaliadorId: string, startupId: string): Promise<void> => {
  await delay(500);
  
  const avaliador = avaliadores.find((a) => a.id === avaliadorId);
  if (avaliador && !avaliador.startupsAtribuidas.includes(startupId)) {
    avaliador.startupsAtribuidas.push(startupId);
  }
};

// Funções de Critérios
export const listarCriterios = async (): Promise<Criterio[]> => {
  await delay(300);
  return criterios;
};

export const adicionarCriterio = async (data: Omit<Criterio, "id">): Promise<Criterio> => {
  await delay(500);
  
  const novoCriterio: Criterio = {
    ...data,
    id: Date.now().toString(),
  };
  
  criterios.push(novoCriterio);
  return novoCriterio;
};

// Funções de Avaliações
export const salvarAvaliacao = async (data: Omit<Avaliacao, "id" | "data">): Promise<Avaliacao> => {
  await delay(800);
  
  const novaAvaliacao: Avaliacao = {
    ...data,
    id: Date.now().toString(),
    data: new Date().toISOString().split("T")[0],
  };
  
  avaliacoes.push(novaAvaliacao);
  
  // Atualizar nota média da startup
  const startupAvaliacoes = avaliacoes.filter((a) => a.startupId === data.startupId);
  if (startupAvaliacoes.length > 0) {
    const notasComPeso = startupAvaliacoes.map((av) => {
      let somaNotas = 0;
      criterios.forEach((c) => {
        somaNotas += (av.notas[c.id] || 0) * (c.peso / 100);
      });
      return somaNotas;
    });
    
    const media = notasComPeso.reduce((a, b) => a + b, 0) / notasComPeso.length;
    const startup = startups.find((s) => s.id === data.startupId);
    if (startup) {
      startup.notaMedia = Number(media.toFixed(1));
      if (startup.status === "pendente") {
        startup.status = "em_avaliacao";
      }
    }
  }
  
  return novaAvaliacao;
};

export const listarAvaliacoes = async (startupId: string): Promise<Avaliacao[]> => {
  await delay(300);
  return avaliacoes.filter((a) => a.startupId === startupId);
};

// Funções de métricas
export const obterMetricas = async () => {
  await delay(400);
  
  return {
    totalStartups: startups.length,
    totalAvaliadores: avaliadores.length,
    totalAvaliacoes: avaliacoes.length,
    aprovadas: startups.filter((s) => s.status === "aprovada").length,
    reprovadas: startups.filter((s) => s.status === "reprovada").length,
  };
};

// Função de envio de e-mail (simulado)
export const enviarEmail = async (tipo: "aprovacao" | "reprovacao", startupId: string): Promise<void> => {
  await delay(1000);
  console.log(`E-mail de ${tipo} enviado para startup ${startupId}`);
};
