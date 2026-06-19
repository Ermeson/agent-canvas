import React, { useState } from 'react';
import { Settings, HelpCircle, Sparkles, Download, Save, Pencil, Check } from 'lucide-react';
import { CanvasBlock } from './components/CanvasBlock';
import { AIAssistant } from './components/AIAssistant';
import { INITIAL_BLOCKS, CanvasBlockData } from './types';
import { cn } from './lib/utils';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function App() {
  const [blocks, setBlocks] = useState<CanvasBlockData[]>(INITIAL_BLOCKS);
  const [showAI, setShowAI] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [isAIAssistantActive, setIsAIAssistantActive] = useState(true);
  const [projectTitle, setProjectTitle] = useState('Meu Agente de IA');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(projectTitle);

  const handleContentChange = (id: string, content: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content } : b));
  };

  const triggerAISuggestion = (id: string) => {
    const block = blocks.find(b => b.id === id);
    if (!block) return;

    setActiveBlockId(id);
    // Mocking an AI suggestion based on the block
    const suggestions: Record<string, string> = {
      'mission': "Sua missão é clara. Que tal especificar ainda mais o sucesso mensurável (ex: acurácia ou tempo de resposta)?",
      'context-data': "Lembre-se de diferenciar os dados estáticos dos dinâmicos que o agente acessará em tempo real.",
      'execution-flow': "Descrever detalhadamente a etapa de tomada de decisão do LLM pode ajudar na previsibilidade.",
      'guardrails': "Considere adicionar um limite rígido de chamadas de API por minuto para evitar custos inesperados.",
    };

    setAiSuggestion(suggestions[id] || "Com base nos dados atuais, recomendo otimizar o fluxo de coleta de dados para maior precisão.");
    setShowAI(true);
  };

  const applySuggestion = () => {
    if (activeBlockId) {
      // In a real app, we'd parse the suggestion or have a structured response
      // For this demo, we just append a note
      handleContentChange(activeBlockId, (blocks.find(b => b.id === activeBlockId)?.content || '') + "\n\n[Sugestão IA Aplicada]");
    }
    setShowAI(false);
  };

  const handleTitleSave = () => {
    setProjectTitle(tempTitle.trim() || 'Untitled Strategy');
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleTitleSave();
    if (e.key === 'Escape') {
      setTempTitle(projectTitle);
      setIsEditingTitle(false);
    }
  };

  const handleExport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(33, 33, 33);
    doc.text('Relatório Agent Canvas', 14, 22);

    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(projectTitle, 14, 32);

    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 40);

    // Table Data
    const tableData = blocks.map(block => [
      block.category,
      block.title,
      block.content || '(Vazio)'
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Categoria', 'Campo', 'Conteúdo']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [103, 80, 164], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 50, fontStyle: 'bold' },
        2: { cellWidth: 'auto' }
      },
      styles: { overflow: 'linebreak', cellPadding: 5 },
      margin: { top: 50 }
    });

    doc.save(`${projectTitle.replace(/\s+/g, '_')}_Relatorio_IA.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-outline-variant/10 px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center z-10 gap-4 md:gap-0">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <span className="-rotate-5 bg-amber-200 px-2 text-xl md:text-2xl font-black tracking-tighter text-on-surface whitespace-nowrap">Agent Canvas</span>
          <nav className="hidden md:flex gap-6 ml-8">
          </nav>
          {/* Mobile settings icon */}
          <div className="md:hidden flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-outline-variant/20 mx-2" />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container rounded-md transition-all active:scale-95 flex items-center justify-center gap-2 border border-outline-variant/10 md:border-none">
              <Save className="w-4 h-4" />
              Salvar
            </button>
            <button
              onClick={handleExport}
              className="cursor-pointer flex-1 md:flex-none px-5 py-2 text-sm font-semibold bg-primary text-on-primary rounded-md shadow-sm hover:opacity-90 transition-all active:scale-95 bg-gradient-to-b from-primary-dim to-primary flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full overflow-y-auto md:overflow-hidden">
        {/* Project Title Section - Now with padding since it's outside the grid but inside main */}
        <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-end bg-white border-b border-outline-variant/20 gap-4 md:gap-0">
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex items-center gap-3 group">
              {isEditingTitle ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    autoFocus
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={handleTitleSave}
                    onKeyDown={handleTitleKeyDown}
                    className="text-2xl md:text-3xl font-black tracking-tight leading-none text-on-surface bg-surface-container-low px-2 py-1 rounded-md border-none focus:ring-2 focus:ring-primary outline-none w-full"
                  />
                  <button onClick={handleTitleSave} className="p-1 text-primary hover:bg-surface-container rounded-full transition-colors">
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <h1
                    onClick={() => { setIsEditingTitle(true); setTempTitle(projectTitle); }}
                    className="text-2xl md:text-3xl font-black tracking-tight leading-none text-on-surface cursor-pointer hover:text-primary transition-colors break-words max-w-[80vw] md:max-w-none"
                  >
                    {projectTitle}
                  </h1>
                  <button
                    onClick={() => { setIsEditingTitle(true); setTempTitle(projectTitle); }}
                    className="p-1 text-on-surface-variant/40 hover:text-primary opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            <p className="mt-1 text-on-surface-variant font-medium tracking-wide text-[10px] uppercase">Desenhando agentes de IA com segurança e governança</p>
          </div>
        </div>

        {/* The Column-based Canvas */}
        <div className="flex-grow flex flex-col md:flex-row bg-surface-container-low border-t border-outline-variant/10 overflow-y-auto md:overflow-hidden">
          {/* Coluna 1: Concepção & Conhecimento */}
          <div className="flex-1 flex flex-col md:border-r border-outline-variant/20 md:overflow-y-auto">
            {blocks.filter(b => ['mission', 'context-data', 'memory-persistence'].includes(b.id)).map(block => (
              <CanvasBlock
                key={block.id}
                block={block}
                onChange={handleContentChange}
                onAISuggest={triggerAISuggestion}
                isAIAssistantActive={true}
                className="flex-1"
              />
            ))}
          </div>

          {/* Coluna 2: Execução & Lógica */}
          <div className="flex-1 flex flex-col md:border-r border-outline-variant/20 md:overflow-y-auto">
            {blocks.filter(b => ['execution-flow', 'tools-integrations', 'guardrails'].includes(b.id)).map(block => (
              <CanvasBlock
                key={block.id}
                block={block}
                onChange={handleContentChange}
                onAISuggest={triggerAISuggestion}
                isAIAssistantActive={true}
                className="flex-1"
              />
            ))}
          </div>

          {/* Coluna 3: Saída, Governança & Decisão */}
          <div className="flex-1 flex flex-col md:overflow-y-auto">
            {blocks.filter(b => ['output-deliverable', 'governance', 'evaluation', 'feasibility'].includes(b.id)).map(block => (
              <CanvasBlock
                key={block.id}
                block={block}
                onChange={handleContentChange}
                onAISuggest={triggerAISuggestion}
                isAIAssistantActive={true}
                className="flex-1"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
