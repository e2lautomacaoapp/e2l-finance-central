
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DespesaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  despesa: any;
}

export function DespesaDetailsModal({ isOpen, onClose, despesa }: DespesaDetailsModalProps) {
  if (!despesa) return null;

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            Detalhes da Despesa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Item/Serviço</h3>
              <p className="text-lg font-semibold">{despesa.item}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Valor</h3>
              <p className="text-lg font-semibold text-e2l-danger">
                R$ {despesa.valor.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          <Separator />

          {/* Informações da nota fiscal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Nota Fiscal</h3>
              <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {despesa.notaFiscal}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Data</h3>
              <p>{new Date(despesa.data).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <Separator />

          {/* Informações do fornecedor e pagamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fornecedor</h3>
              <p>{despesa.fornecedor}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Forma de Pagamento</h3>
              <p>{despesa.formaPagamento}</p>
            </div>
          </div>

          <Separator />

          {/* Status e observações */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              {getStatusBadge(despesa.status)}
            </div>

            {despesa.observacoes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Observações</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {despesa.observacoes}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
