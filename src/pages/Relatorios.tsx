
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import { toast } from "sonner";

const Relatorios = () => {
  const [filtros, setFiltros] = useState({
    tipo: "",
    dataInicio: "",
    dataFim: "",
    cliente: "",
    status: ""
  });

  const handleExportar = (formato: 'pdf' | 'csv' | 'xlsx') => {
    // Aqui você integraria com biblioteca de exportação
    console.log('Exportando relatório:', { filtros, formato });
    toast.success(`Relatório ${formato.toUpperCase()} gerado com sucesso!`);
  };

  const relatoriosDisponiveis = [
    {
      title: "Receitas por Período",
      description: "Relatório detalhado de todas as receitas em um período específico",
      icon: "📈"
    },
    {
      title: "Despesas por Categoria",
      description: "Análise de despesas organizadas por categoria ou fornecedor",
      icon: "📊"
    },
    {
      title: "Fluxo de Caixa",
      description: "Visão completa de entradas e saídas por período",
      icon: "💰"
    },
    {
      title: "Clientes e Receitas",
      description: "Relatório de receitas agrupadas por cliente",
      icon: "👥"
    },
    {
      title: "Metas vs Realizado",
      description: "Comparativo entre metas estabelecidas e valores realizados",
      icon: "🎯"
    },
    {
      title: "Contas a Receber",
      description: "Relatório de receitas pendentes e vencimentos",
      icon: "⏰"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-e2l-primary">Relatórios</h1>
        <p className="text-gray-600">Gere relatórios detalhados da gestão financeira</p>
      </div>

      {/* Filtros */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filtros de Relatório
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Relatório</Label>
              <Select value={filtros.tipo} onValueChange={(value) => setFiltros(prev => ({ ...prev, tipo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receitas">Receitas</SelectItem>
                  <SelectItem value="despesas">Despesas</SelectItem>
                  <SelectItem value="fluxo-caixa">Fluxo de Caixa</SelectItem>
                  <SelectItem value="clientes">Clientes</SelectItem>
                  <SelectItem value="metas">Metas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data Início</Label>
              <Input
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros(prev => ({ ...prev, dataInicio: e.target.value }))}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros(prev => ({ ...prev, dataFim: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <div className="flex gap-2">
              <Button 
                onClick={() => handleExportar('pdf')}
                className="btn-primary"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              
              <Button 
                onClick={() => handleExportar('csv')}
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
              
              <Button 
                onClick={() => handleExportar('xlsx')}
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Disponíveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatoriosDisponiveis.map((relatorio, index) => (
          <Card key={index} className="card-elevated hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{relatorio.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-e2l-primary mb-2">{relatorio.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{relatorio.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas Rápidas */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg">Resumo do Período Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-e2l-success">R$ 128.450</div>
              <div className="text-sm text-gray-600">Total de Receitas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-e2l-danger">R$ 89.230</div>
              <div className="text-sm text-gray-600">Total de Despesas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-e2l-secondary">R$ 39.220</div>
              <div className="text-sm text-gray-600">Saldo Líquido</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-e2l-accent">78%</div>
              <div className="text-sm text-gray-600">Meta Atingida</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
