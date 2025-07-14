
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, User, FileText } from "lucide-react";

interface ClienteDetailsModalProps {
  cliente: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ClienteDetailsModal({ cliente, isOpen, onClose }: ClienteDetailsModalProps) {
  if (!cliente) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalhes do Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Informações Básicas
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Nome/Razão Social:</span>
                  <p className="text-gray-900 font-medium">{cliente.nome}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">CNPJ/CPF:</span>
                  <p className="text-gray-900 font-mono">{cliente.cnpjCpf}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Tipo:</span>
                  <Badge variant="secondary" className="ml-2">
                    {cliente.tipo}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contatos
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">Telefone:</span>
                    <p className="text-gray-900">{cliente.telefone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">Celular:</span>
                    <p className="text-gray-900">{cliente.celular}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <p className="text-gray-900">{cliente.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Endereço
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900">{cliente.endereco}</p>
            </div>
          </div>

          {/* Estatísticas (mockadas para demonstração) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-800">Vendas</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">R$ 25.400</div>
              <div className="text-sm text-green-800">Total Faturado</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-yellow-800">Em Aberto</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">8 meses</div>
              <div className="text-sm text-purple-800">Cliente há</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
