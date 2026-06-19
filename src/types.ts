export interface CanvasBlockData {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  content: string;
  category: string;
  gridSpan: string;
}

export const INITIAL_BLOCKS: CanvasBlockData[] = [
  {
    id: 'mission',
    title: '01 · Missão',
    description: 'Escreva em uma frase o que o agente faz e para quem. Defina o que é sucesso mensurável.',
    placeholder: 'O agente faz X para Y com o objetivo de obter Z...',
    content: '',
    category: 'MISSÃO',
    gridSpan: '',
  },
  {
    id: 'context-data',
    title: '02 · Contexto & Dados',
    description: 'Liste quais documentos, bases ou sistemas o agente precisa acessar. Separe o que já está disponível do que ainda falta.',
    placeholder: 'Disponível: Banco de dados de clientes, docs da API.\nFalta: Acesso à API de pagamentos...',
    content: '',
    category: 'CONTEXTO',
    gridSpan: '',
  },
  {
    id: 'execution-flow',
    title: '03 · Fluxo de Execução',
    description: 'Descreva o passo a passo: o que dispara o agente, como ele coleta dados, qual lógica aplica, que ação executa e para quem entrega o resultado.',
    placeholder: '1. O gatilho X inicia...\n2. O agente busca Y...\n3. Processa usando a lógica Z...',
    content: '',
    category: 'FLUXO',
    gridSpan: '',
  },
  {
    id: 'guardrails',
    title: '04 · Guardrails & Anti-alucinação',
    description: 'Defina o que o agente não pode fazer. Estabeleça quando ele deve parar, indicar incerteza ou escalar para um humano.',
    placeholder: 'O agente nunca deve aprovar transações acima de R$1000.\nEm caso de dúvidas, encaminhar ao analista...',
    content: '',
    category: 'SEGURANÇA',
    gridSpan: '',
  },
  {
    id: 'memory-persistence',
    title: '05 · Memória & Persistência',
    description: 'Decida o que o agente precisa lembrar entre sessões e por quanto tempo. Identifique se há necessidade de base de conhecimento externa (RAG).',
    placeholder: 'Precisa persistir preferências do usuário por 30 dias.\nBase de conhecimento (RAG) com a documentação do produto...',
    content: '',
    category: 'MEMÓRIA',
    gridSpan: '',
  },
  {
    id: 'tools-integrations',
    title: '06 · Ferramentas & Integrações',
    description: 'Liste os sistemas que o agente vai acessar. Indique se ele apenas lê ou também escreve e executa ações em cada sistema.',
    placeholder: 'Slack API (leitura/escrita)\nCRM Hubspot (leitura)\nTerminal local (execução restrita)...',
    content: '',
    category: 'INTEGRAÇÃO',
    gridSpan: '',
  },
  {
    id: 'output-deliverable',
    title: '07 · Saída & Entregável',
    description: 'Descreva o formato da saída, quem a recebe e se ela passa por revisão humana antes de chegar ao destinatário final.',
    placeholder: 'Relatório formatado em Markdown enviado no canal #relatorios do Slack.\nRevisado pelo supervisor...',
    content: '',
    category: 'ENTREGÁVEL',
    gridSpan: '',
  },
  {
    id: 'governance',
    title: '08 · Governança & Proteção de Dados',
    description: 'Defina quem aprova, monitora e pode desligar o agente. Verifique se há dados pessoais e qual a base legal para processá-los.',
    placeholder: 'Aprovação: CTO.\nMonitoramento: Logs via Datadog.\nTratamento de dados: Anonimização de CPF/CNPJ...',
    content: '',
    category: 'GOVERNANÇA',
    gridSpan: '',
  },
  {
    id: 'evaluation',
    title: '09 · Avaliação & Melhoria Contínua',
    description: 'Escolha a métrica de sucesso e estabeleça com que frequência o agente será revisado e por quem.',
    placeholder: 'Acurácia mínima de 95% avaliada mensalmente pelo time de QA.\nColeta de feedback do usuário final...',
    content: '',
    category: 'AVALIAÇÃO',
    gridSpan: '',
  },
  {
    id: 'feasibility',
    title: '10 · Viabilidade & Decisão',
    description: 'Avalie se a tarefa é repetitiva e previsível o suficiente, se os dados são confiáveis e se o erro tem custo tolerável. Só avance se houver alguém responsável por revisar a saída.',
    placeholder: 'Tarefa altamente repetitiva.\nCusto de erro baixo devido à aprovação manual obrigatória antes do envio...',
    content: '',
    category: 'VIABILIDADE',
    gridSpan: '',
  },
];





