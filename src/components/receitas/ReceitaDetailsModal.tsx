
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, FileText, User, CreditCard, Eye, DollarSign } from "lucide-react";

interface ReceitaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  receita: any;
}

export function ReceitaDetailsModal({ isOpen, onClose, receita }: ReceitaDetailsModalProps) {
  if (!receita) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Detalhes da Receita
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valor
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold text-e2l-success">
                  R$ {receita.valor.toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Data
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-lg font-semibold">
                  {new Date(receita.data).toLocaleDateString('pt-BR')}
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
                  Nota Fiscal
                </label>
                <p className="text-base font-mono bg-gray-50 p-2 rounded">
                  {receita.notaFiscal || "Não informado"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  Cliente
                </label>
                <p className="text-base bg-gray-50 p-2 rounded">
                  {receita.cliente}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Item/Serviço
              </label>
              <p className="text-base bg-gray-50 p-2 rounded">
                {receita.item}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Status
                </label>
                <div className="bg-gray-50 p-2 rounded">
                  {getStatusBadge(receita.status)}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
                  <CreditCard className="h-4 w-4" />
                  Forma de Pagamento
                </label>
                <p className="text-base bg-gray-50 p-2 rounded">
                  {receita.formaPagamento}
                </p>
              </div>
            </div>

            {receita.observacoes && (
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Observações
                </label>
                <p className="text-base bg-gray-50 p-3 rounded min-h-[80px]">
                  {receita.observacoes}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
