
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

  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleExportar = (formato: 'pdf' | 'csv' | 'xlsx') => {
    // Validar se os filtros obrigatórios estão preenchidos
    if (!filtros.tipo) {
      toast.error("Selecione o tipo de relatório para exportar");
      return;
    }

    if (!filtros.dataInicio || !filtros.dataFim) {
      toast.error("Selecione o período para exportar o relatório");
      return;
    }

    // Simular processo de exportação
    console.log('Exportando relatório:', { filtros, formato });
    
    // Simular dados baseados no tipo de relatório
    const dadosSimulados = gerarDadosSimulados(filtros.tipo);
    
    if (formato === 'csv') {
      exportarCSV(dadosSimulados, filtros.tipo);
    } else if (formato === 'xlsx') {
      exportarExcel(dadosSimulados, filtros.tipo);
    } else {
      exportarPDF(dadosSimulados, filtros.tipo);
    }
    
    toast.success(`Relatório ${formato.toUpperCase()} gerado com sucesso!`);
  };

  const gerarDadosSimulados = (tipo: string) => {
    const dados: any = {
      periodo: `${filtros.dataInicio} a ${filtros.dataFim}`,
      tipo: tipo
    };

    switch (tipo) {
      case 'receitas':
        dados.itens = [
          { data: '01/01/2024', cliente: 'Cliente A', valor: 5000, categoria: 'Vendas' },
          { data: '15/01/2024', cliente: 'Cliente B', valor: 3200, categoria: 'Serviços' },
          { data: '30/01/2024', cliente: 'Cliente C', valor: 8500, categoria: 'Consultoria' }
        ];
        dados.total = 16700;
        break;
      case 'despesas':
        dados.itens = [
          { data: '05/01/2024', fornecedor: 'Fornecedor X', valor: 2500, categoria: 'Material' },
          { data: '12/01/2024', fornecedor: 'Fornecedor Y', valor: 1800, categoria: 'Serviços' },
          { data: '25/01/2024', fornecedor: 'Fornecedor Z', valor: 3200, categoria: 'Equipamentos' }
        ];
        dados.total = 7500;
        break;
      case 'fluxo-caixa':
        dados.entradas = 16700;
        dados.saidas = 7500;
        dados.saldo = 9200;
        break;
      case 'clientes':
        dados.itens = [
          { cliente: 'Cliente A', totalReceitas: 15000, numeroTransacoes: 5 },
          { cliente: 'Cliente B', totalReceitas: 8200, numeroTransacoes: 3 },
          { cliente: 'Cliente C', totalReceitas: 12500, numeroTransacoes: 4 }
        ];
        break;
      case 'metas':
        dados.itens = [
          { meta: 'Receita Mensal', valorMeta: 150000, valorAtual: 128450, progresso: 85.6 },
          { meta: 'Controle Despesas', valorMeta: 90000, valorAtual: 89230, progresso: 99.1 },
          { meta: 'Receita Anual', valorMeta: 1800000, valorAtual: 620000, progresso: 34.4 }
        ];
        break;
      default:
        dados.itens = [];
    }

    return dados;
  };

  const exportarCSV = (dados: any, tipo: string) => {
    let csvContent = '';
    
    switch (tipo) {
      case 'receitas':
        csvContent = 'Data,Cliente,Valor,Categoria\n';
        dados.itens.forEach((item: any) => {
          csvContent += `${item.data},${item.cliente},${item.valor},${item.categoria}\n`;
        });
        break;
      case 'despesas':
        csvContent = 'Data,Fornecedor,Valor,Categoria\n';
        dados.itens.forEach((item: any) => {
          csvContent += `${item.data},${item.fornecedor},${item.valor},${item.categoria}\n`;
        });
        break;
      case 'clientes':
        csvContent = 'Cliente,Total Receitas,Número Transações\n';
        dados.itens.forEach((item: any) => {
          csvContent += `${item.cliente},${item.totalReceitas},${item.numeroTransacoes}\n`;
        });
        break;
      default:
        csvContent = 'Relatório,Dados\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${tipo}-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportarExcel = (dados: any, tipo: string) => {
    // Simular exportação Excel
    console.log('Exportando Excel:', dados);
    toast.info("Funcionalidade Excel em desenvolvimento. Use CSV por enquanto.");
  };

  const exportarPDF = (dados: any, tipo: string) => {
    // Simular exportação PDF
    console.log('Exportando PDF:', dados);
    toast.info("Funcionalidade PDF em desenvolvimento. Use CSV por enquanto.");
  };

  const handleGerarRelatorio = async (tipoRelatorio: string) => {
    setIsGenerating(tipoRelatorio);
    
    try {
      // Simular geração de relatório
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const dados = gerarDadosSimulados(tipoRelatorio);
      console.log(`Relatório ${tipoRelatorio} gerado:`, dados);
      
      toast.success(`Relatório "${getTituloRelatorio(tipoRelatorio)}" gerado com sucesso!`);
    } catch (error) {
      toast.error("Erro ao gerar relatório. Tente novamente.");
    } finally {
      setIsGenerating(null);
    }
  };

  const getTituloRelatorio = (tipo: string) => {
    const titulos: { [key: string]: string } = {
      'receitas-periodo': 'Receitas por Período',
      'despesas-categoria': 'Despesas por Categoria',
      'fluxo-caixa': 'Fluxo de Caixa',
      'clientes-receitas': 'Clientes e Receitas',
      'metas-realizado': 'Metas vs Realizado',
      'contas-receber': 'Contas a Receber'
    };
    return titulos[tipo] || tipo;
  };

  const relatoriosDisponiveis = [
    {
      id: 'receitas-periodo',
      title: "Receitas por Período",
      description: "Relatório detalhado de todas as receitas em um período específico",
      icon: "📈"
    },
    {
      id: 'despesas-categoria',
      title: "Despesas por Categoria",
      description: "Análise de despesas organizadas por categoria ou fornecedor",
      icon: "📊"
    },
    {
      id: 'fluxo-caixa',
      title: "Fluxo de Caixa",
      description: "Visão completa de entradas e saídas por período",
      icon: "💰"
    },
    {
      id: 'clientes-receitas',
      title: "Clientes e Receitas",
      description: "Relatório de receitas agrupadas por cliente",
      icon: "👥"
    },
    {
      id: 'metas-realizado',
      title: "Metas vs Realizado",
      description: "Comparativo entre metas estabelecidas e valores realizados",
      icon: "🎯"
    },
    {
      id: 'contas-receber',
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
                disabled={!filtros.tipo || !filtros.dataInicio || !filtros.dataFim}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              
              <Button 
                onClick={() => handleExportar('csv')}
                variant="outline"
                disabled={!filtros.tipo || !filtros.dataInicio || !filtros.dataFim}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
              
              <Button 
                onClick={() => handleExportar('xlsx')}
                variant="outline"
                disabled={!filtros.tipo || !filtros.dataInicio || !filtros.dataFim}
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
        {relatoriosDisponiveis.map((relatorio) => (
          <Card key={relatorio.id} className="card-elevated hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{relatorio.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-e2l-primary mb-2">{relatorio.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{relatorio.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleGerarRelatorio(relatorio.id)}
                    disabled={isGenerating === relatorio.id}
                  >
                    {isGenerating === relatorio.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Gerar Relatório
                      </>
                    )}
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
