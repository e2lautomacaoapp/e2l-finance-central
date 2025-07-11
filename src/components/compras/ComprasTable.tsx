
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

interface ComprasTableProps {
  searchTerm: string;
  filters: {
    status: string | undefined;
    dataInicio: string;
    dataFim: string;
  };
  onViewDetails: (compra: any) => void;
  onEdit: (compra: any) => void;
  onDelete: (compraId: number) => void;
}

const mockCompras = [
  {
    id: 1,
    cliente: "Empresa ABC Ltda",
    itens_materiais: "Sensores industriais, Cabos elétricos",
    data: "2024-01-08",
    valor: 15000,
    solicitante: "João Silva",
    status: "aprovada"
  },
  {
    id: 2,
    cliente: "Indústria DEF",
    itens_materiais: "CLP Siemens, Interface HMI",
    data: "2024-01-06",
    valor: 28000,
    solicitante: "Maria Santos",
    status: "pendente"
  },
  {
    id: 3,
    cliente: "Metalúrgica XYZ",
    itens_materiais: "Inversores de frequência, Relés",
    data: "2024-01-04",
    valor: 12500,
    solicitante: "Carlos Oliveira",
    status: "entregue"
  }
];

export function ComprasTable({ searchTerm, filters, onViewDetails, onEdit, onDelete }: ComprasTableProps) {
  const [compras] = useState(mockCompras);

  const filteredCompras = compras.filter(compra => {
    const matchesSearch = compra.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compra.itens_materiais.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compra.solicitante.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || filters.status === "all" || compra.status === filters.status;

    const compraDate = new Date(compra.data);
    const matchesDateRange = (!filters.dataInicio || compraDate >= new Date(filters.dataInicio)) &&
      (!filters.dataFim || compraDate <= new Date(filters.dataFim));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aprovada':
        return <Badge className="bg-e2l-success text-white">Aprovada</Badge>;
      case 'pendente':
        return <Badge className="bg-e2l-warning text-white">Pendente</Badge>;
      case 'entregue':
        return <Badge className="bg-e2l-accent text-white">Entregue</Badge>;
      case 'cancelada':
        return <Badge className="bg-e2l-danger text-white">Cancelada</Badge>;
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
                <th className="text-left p-4 font-semibold text-gray-700">Cliente</th>
                <th className="text-left p-4 font-semibold text-gray-700">Itens/Materiais</th>
                <th className="text-left p-4 font-semibold text-gray-700">Solicitante</th>
                <th className="text-left p-4 font-semibold text-gray-700">Valor</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompras.map((compra) => (
                <tr key={compra.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm">
                    {new Date(compra.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4 text-sm font-medium">{compra.cliente}</td>
                  <td className="p-4 text-sm max-w-xs truncate">{compra.itens_materiais}</td>
                  <td className="p-4 text-sm">{compra.solicitante}</td>
                  <td className="p-4 text-sm font-semibold text-e2l-primary">
                    R$ {compra.valor.toLocaleString('pt-BR')}
                  </td>
                  <td className="p-4">{getStatusBadge(compra.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewDetails(compra)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEdit(compra)}
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
                              Tem certeza que deseja excluir esta compra? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(compra.id)}
                              className="bg-e2l-danger hover:bg-e2l-danger/90"
                            >
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

        {filteredCompras.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma compra encontrada</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
