
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, Download } from "lucide-react";
import { toast } from "sonner";

interface RelatorioGerado {
  id: string;
  titulo: string;
  tipo: string;
  dados: any;
  dataGeracao: string;
  periodo: string;
}

interface RelatorioVisualizacaoProps {
  relatorio: RelatorioGerado;
  onExport?: (formato: 'pdf' | 'csv' | 'xlsx') => void;
}

const RelatorioVisualizacao = ({ relatorio, onExport }: RelatorioVisualizacaoProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleExport = (formato: 'pdf' | 'csv' | 'xlsx') => {
    toast.success(`Exportando ${relatorio.titulo} em ${formato.toUpperCase()}`);
    if (onExport) {
      onExport(formato);
    }
  };

  const renderContent = () => {
    switch (relatorio.tipo) {
      case 'receitas-periodo':
        return (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatorio.dados.itens?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.data}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell className="text-right font-medium text-e2l-success">
                      {formatCurrency(item.valor)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-e2l-success">
                Total: {formatCurrency(relatorio.dados.total)}
              </div>
            </div>
          </div>
        );

      case 'despesas-categoria':
        return (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatorio.dados.itens?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.data}</TableCell>
                    <TableCell>{item.fornecedor}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell className="text-right font-medium text-e2l-danger">
                      {formatCurrency(item.valor)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-e2l-danger">
                Total: {formatCurrency(relatorio.dados.total)}
              </div>
            </div>
          </div>
        );

      case 'fluxo-caixa':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-e2l-success">Entradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-e2l-success">
                  {formatCurrency(relatorio.dados.entradas)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-e2l-danger">Saídas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-e2l-danger">
                  {formatCurrency(relatorio.dados.saidas)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-e2l-secondary">Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-e2l-secondary">
                  {formatCurrency(relatorio.dados.saldo)}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'clientes-receitas':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Total Receitas</TableHead>
                <TableHead className="text-right">Nº Transações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatorio.dados.itens?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.cliente}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.totalReceitas)}
                  </TableCell>
                  <TableCell className="text-right">{item.numeroTransacoes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'metas-realizado':
        return (
          <div className="space-y-6">
            {relatorio.dados.itens?.map((item: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{item.meta}</h4>
                      <span className="text-sm text-gray-600">{item.progresso.toFixed(1)}%</span>
                    </div>
                    <Progress value={item.progresso} className="w-full" />
                    <div className="flex justify-between text-sm">
                      <span>Realizado: {formatCurrency(item.valorAtual)}</span>
                      <span>Meta: {formatCurrency(item.valorMeta)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'contas-receber':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatorio.dados.itens?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.cliente}</TableCell>
                  <TableCell>{item.vencimento}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Em dia' ? 'bg-green-100 text-green-800' :
                      item.status === 'Vencido' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.valor)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      default:
        return <div>Tipo de relatório não suportado</div>;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Visualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{relatorio.titulo}</DialogTitle>
          <div className="text-sm text-gray-600">
            Período: {relatorio.periodo} | Gerado em: {relatorio.dataGeracao}
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {renderContent()}
          
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={() => handleExport('pdf')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button onClick={() => handleExport('csv')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button onClick={() => handleExport('xlsx')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RelatorioVisualizacao;
