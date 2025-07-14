
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Briefcase } from "lucide-react";

interface FornecedorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fornecedor: any;
}

export function FornecedorDetailsModal({ isOpen, onClose, fornecedor }: FornecedorDetailsModalProps) {
  if (!fornecedor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            Detalhes do Fornecedor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Informações Básicas</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome/Razão Social</label>
                  <p className="text-gray-900 font-medium">{fornecedor.nome}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Serviço/Produto</label>
                    <p className="text-gray-900">{fornecedor.servico}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contatos */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Contatos</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Telefone</label>
                    <p className="text-gray-900">{fornecedor.telefone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Celular</label>
                    <p className="text-gray-900">{fornecedor.celular}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Endereço</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Endereço Completo</label>
                    <p className="text-gray-900">{fornecedor.endereco}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
