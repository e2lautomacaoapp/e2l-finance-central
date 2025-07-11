
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DespesasTableProps {
  searchTerm: string;
  filters: {
    status?: string;
    formaPagamento?: string;
    dataInicio?: string;
    dataFim?: string;
  };
  onViewDetails: (despesa: any) => void;
  onEditDespesa: (despesa: any) => void;
  onDeleteDespesa: (despesa: any) => void;
}

const mockDespesas = [
  {
    id: 1,
    valor: 8500,
    data: "2024-01-07",
    notaFiscal: "NF-101/2024",
    item: "Compra de Equipamentos",
    fornecedor: "Fornecedor XYZ",
    status: "pago",
    formaPagamento: "Cartão de Crédito",
    observacoes: "Parcelado em 3x"
  },
  {
    id: 2,
    valor: 4500,
    data: "2024-01-05",
    notaFiscal: "NF-102/2024",
    item: "Aluguel do Escritório",
    fornecedor: "Imobiliária GHI",
    status: "pago",
    formaPagamento: "Pix",
    observacoes: "Pagamento mensal"
  },
  {
    id: 3,
    valor: 2800,
    data: "2024-01-03",
    notaFiscal: "NF-103/2024",
    item: "Material de Escritório",
    fornecedor: "Papelaria ABC",
    status: "pendente",
    formaPagamento: "Cartão de Débito",
    observacoes: ""
  }
];

export function DespesasTable({ 
  searchTerm, 
  filters, 
  onViewDetails, 
  onEditDespesa, 
  onDeleteDespesa 
}: DespesasTableProps) {
  const [despesas] = useState(mockDespesas);

  const filteredDespesas = despesas.filter(despesa => {
    // Filtro por termo de busca
    const matchesSearch = despesa.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.notaFiscal.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por status
    const matchesStatus = !filters.status || despesa.status === filters.status;

    // Filtro por forma de pagamento
    const matchesFormaPagamento = !filters.formaPagamento || 
      despesa.formaPagamento === filters.formaPagamento;

    // Filtro por data
    let matchesDateRange = true;
    if (filters.dataInicio && filters.dataFim) {
      const despesaDate = new Date(despesa.data);
      const startDate = new Date(filters.dataInicio);
      const endDate = new Date(filters.dataFim);
      matchesDateRange = despesaDate >= startDate && despesaDate <= endDate;
    }

    return matchesSearch && matchesStatus && matchesFormaPagamento && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return <Badge className="bg-e2l-success text-white">Pago</Badge>;
      case 'pendente':
        return <Badge className="bg-e2l-warning text-white">Pendente</Badge>;
      case 'vencido':
        return <Badge className="bg-e2l-danger text-white">Vencido</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="card-elevated">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Data</th>
                <th className="text-left p-4 font-semibold text-gray-700">NF</th>
                <th className="text-left p-4 font-semibold text-gray-700">Item/Serviço</th>
                <th className="text-left p-4 font-semibold text-gray-700">Fornecedor</th>
                <th className="text-left p-4 font-semibold text-gray-700">Valor</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Pagamento</th>
                <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDespesas.map((despesa) => (
                <tr key={despesa.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm">
                    {new Date(despesa.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4 text-sm font-mono">{despesa.notaFiscal}</td>
                  <td className="p-4 text-sm font-medium">{despesa.item}</td>
                  <td className="p-4 text-sm">{despesa.fornecedor}</td>
                  <td className="p-4 text-sm font-semibold text-e2l-danger">
                    R$ {despesa.valor.toLocaleString('pt-BR')}
                  </td>
                  <td className="p-4">{getStatusBadge(despesa.status)}</td>
                  <td className="p-4 text-sm">{despesa.formaPagamento}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewDetails(despesa)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEditDespesa(despesa)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-e2l-danger hover:text-e2l-danger">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteDespesa(despesa)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDespesas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma despesa encontrada</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
