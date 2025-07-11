
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, FileText, User, Eye, DollarSign, Package } from "lucide-react";

interface CompraDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  compra: any;
}

export function CompraDetailsModal({ isOpen, onClose, compra }: CompraDetailsModalProps) {
  if (!compra) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Detalhes da Compra
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valor Total
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold text-e2l-success">
                  R$ {compra.valor.toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Data da Compra
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-lg font-semibold">
                  {new Date(compra.data).toLocaleDateString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Informações Detalhadas */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Cliente
                </label>
                <p className="text-base bg-gray-50 p-2 rounded">
                  {compra.cliente}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  Solicitante
                </label>
                <p className="text-base bg-gray-50 p-2 rounded">
                  {compra.solicitante}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
                <Package className="h-4 w-4" />
                Itens/Materiais
              </label>
              <p className="text-base bg-gray-50 p-3 rounded min-h-[80px]">
                {compra.itens_materiais}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Status
              </label>
              <div className="bg-gray-50 p-2 rounded">
                {getStatusBadge(compra.status)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
