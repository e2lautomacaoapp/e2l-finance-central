
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, TrendingUp, Calendar } from "lucide-react";
import { MetaModal } from "@/components/metas/MetaModal";

const Metas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState<any>(null);

  const metas = [
    {
      id: 1,
      titulo: "Receita Mensal - Janeiro",
      valorMeta: 150000,
      valorAtual: 128450,
      periodo: "Janeiro 2024",
      status: "ativa",
      progresso: 85.6,
      tipo: "receita",
      descricao: "Meta de receita para o mês de Janeiro de 2024"
    },
    {
      id: 2,
      titulo: "Redução de Despesas Q1",
      valorMeta: 90000,
      valorAtual: 89230,
      periodo: "Q1 2024",
      status: "ativa",
      progresso: 99.1,
      tipo: "despesa",
      descricao: "Controle de despesas para o primeiro trimestre"
    },
    {
      id: 3,
      titulo: "Meta Anual de Receitas",
      valorMeta: 1800000,
      valorAtual: 620000,
      periodo: "2024",
      status: "ativa",
      progresso: 34.4,
      tipo: "receita",
      descricao: "Meta de receita anual para 2024"
    },
    {
      id: 4,
      titulo: "Novos Clientes - Trimestre",
      valorMeta: 12,
      valorAtual: 8,
      periodo: "Q1 2024",
      status: "ativa",
      progresso: 66.7,
      tipo: "clientes",
      descricao: "Meta de captação de novos clientes"
    }
  ];

  const handleEditMeta = (meta: any) => {
    setSelectedMeta(meta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeta(null);
  };

  const getProgressColor = (progresso: number) => {
    if (progresso >= 90) return "bg-e2l-success";
    if (progresso >= 70) return "bg-e2l-accent";
    if (progresso >= 50) return "bg-e2l-warning";
    return "bg-e2l-danger";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativa':
        return <span className="px-2 py-1 bg-e2l-success/10 text-e2l-success text-xs rounded-full">Ativa</span>;
      case 'pausada':
        return <span className="px-2 py-1 bg-e2l-warning/10 text-e2l-warning text-xs rounded-full">Pausada</span>;
      case 'concluida':
        return <span className="px-2 py-1 bg-e2l-accent/10 text-e2l-accent text-xs rounded-full">Concluída</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-e2l-primary">Metas Financeiras</h1>
          <p className="text-gray-600">Acompanhe o progresso das suas metas</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      {/* Resumo das Metas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-e2l-success/10 rounded-full">
                <Target className="h-6 w-6 text-e2l-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-e2l-primary">4</div>
                <div className="text-sm text-gray-600">Metas Ativas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-e2l-accent/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-e2l-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-e2l-primary">71%</div>
                <div className="text-sm text-gray-600">Média de Progresso</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-e2l-warning/10 rounded-full">
                <Calendar className="h-6 w-6 text-e2l-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-e2l-primary">2</div>
                <div className="text-sm text-gray-600">Próximas ao Vencimento</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Metas */}
      <div className="space-y-4">
        {metas.map((meta) => (
          <Card key={meta.id} className="card-elevated hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-e2l-primary">{meta.titulo}</h3>
                    {getStatusBadge(meta.status)}
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    Período: {meta.periodo}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span className="font-medium">{meta.progresso.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={meta.progresso} 
                      className="h-2"
                    />
                  </div>
                </div>

                <div className="lg:text-right lg:min-w-[200px]">
                  <div className="text-sm text-gray-600 mb-1">
                    {meta.tipo === 'clientes' ? 'Quantidade' : 'Valor Atual'}
                  </div>
                  <div className="text-xl font-bold text-e2l-secondary mb-1">
                    {meta.tipo === 'clientes' 
                      ? `${meta.valorAtual} / ${meta.valorMeta}`
                      : `R$ ${meta.valorAtual.toLocaleString('pt-BR')}`
                    }
                  </div>
                  <div className="text-sm text-gray-500">
                    {meta.tipo === 'clientes' 
                      ? `Meta: ${meta.valorMeta}`
                      : `Meta: R$ ${meta.valorMeta.toLocaleString('pt-BR')}`
                    }
                  </div>
                  
                  <div className="mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditMeta(meta)}
                    >
                      Editar Meta
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <MetaModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        meta={selectedMeta}
      />
    </div>
  );
};

export default Metas;
