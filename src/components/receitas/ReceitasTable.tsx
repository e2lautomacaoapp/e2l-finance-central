
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";

interface ReceitasTableProps {
  searchTerm: string;
  filters: {
    status: string;
    formaPagamento: string;
    dataInicio: string;
    dataFim: string;
  };
  onViewDetails: (receita: any) => void;
  onEditReceita: (receita: any) => void;
}

const mockReceitas = [
  {
    id: 1,
    valor: 25000,
    data: "2024-01-08",
    notaFiscal: "NF-001/2024",
    item: "Projeto Automação Industrial",
    cliente: "Empresa ABC Ltda",
    status: "pago",
    formaPagamento: "Pix",
    observacoes: "Pagamento via Pix"
  },
  {
    id: 2,
    valor: 12000,
    data: "2024-01-06", 
    notaFiscal: "NF-002/2024",
    item: "Manutenção Preventiva",
    cliente: "Indústria DEF",
    status: "pendente",
    formaPagamento: "Cartão de Crédito",
    observacoes: "Parcelado em 2x"
  },
  {
    id: 3,
    valor: 8000,
    data: "2024-01-04",
    notaFiscal: "NF-003/2024", 
    item: "Consultoria Técnica",
    cliente: "Empresa JKL",
    status: "pago",
    formaPagamento: "Cartão de Débito",
    observacoes: ""
  }
];

export function ReceitasTable({ searchTerm, filters, onViewDetails, onEditReceita }: ReceitasTableProps) {
  const [receitas] = useState(mockReceitas);

  const filteredReceitas = receitas.filter(receita => {
    const matchesSearch = receita.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receita.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receita.notaFiscal.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || receita.status === filters.status;
    const matchesFormaPagamento = !filters.formaPagamento || receita.formaPagamento === filters.formaPagamento;
    
    const matchesDataRange = (!filters.dataInicio || receita.data >= filters.dataInicio) &&
      (!filters.dataFim || receita.data <= filters.dataFim);

    return matchesSearch && matchesStatus && matchesFormaPagamento && matchesDataRange;
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
                <th className="text-left p-4 font-semibold text-gray-700">Cliente</th>
                <th className="text-left p-4 font-semibold text-gray-700">Valor</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Pagamento</th>
                <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceitas.map((receita) => (
                <tr key={receita.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm">
                    {new Date(receita.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4 text-sm font-mono">{receita.notaFiscal}</td>
                  <td className="p-4 text-sm font-medium">{receita.item}</td>
                  <td className="p-4 text-sm">{receita.cliente}</td>
                  <td className="p-4 text-sm font-semibold text-e2l-success">
                    R$ {receita.valor.toLocaleString('pt-BR')}
                  </td>
                  <td className="p-4">{getStatusBadge(receita.status)}</td>
                  <td className="p-4 text-sm">{receita.formaPagamento}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewDetails(receita)}
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEditReceita(receita)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-e2l-danger hover:text-e2l-danger"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReceitas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma receita encontrada</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
