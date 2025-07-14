
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Phone, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ClienteModal } from "./ClienteModal";
import { ClienteDetailsModal } from "./ClienteDetailsModal";
import { toast } from "sonner";

interface ClientesTableProps {
  searchTerm: string;
  filters: {
    tipo?: string;
  };
}

const mockClientes = [
  {
    id: 1,
    nome: "Empresa ABC Ltda",
    cnpjCpf: "12.345.678/0001-90",
    telefone: "(11) 99999-8888",
    celular: "(11) 88888-7777",
    endereco: "Rua das Empresas, 123 - São Paulo/SP",
    email: "contato@empresaabc.com.br",
    tipo: "Pessoa Jurídica"
  },
  {
    id: 2,
    nome: "Indústria DEF S/A",
    cnpjCpf: "98.765.432/0001-10",
    telefone: "(11) 77777-6666",
    celular: "(11) 66666-5555",
    endereco: "Av. Industrial, 456 - São Paulo/SP", 
    email: "comercial@industriadef.com.br",
    tipo: "Pessoa Jurídica"
  },
  {
    id: 3,
    nome: "João Silva Santos",
    cnpjCpf: "123.456.789-00",
    telefone: "(11) 55555-4444",
    celular: "(11) 44444-3333",
    endereco: "Rua dos Clientes, 789 - São Paulo/SP",
    email: "joao.silva@email.com",
    tipo: "Pessoa Física"
  }
];

export function ClientesTable({ searchTerm, filters }: ClientesTableProps) {
  const [clientes] = useState(mockClientes);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<any>(null);

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cnpjCpf.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = !filters.tipo || cliente.tipo === filters.tipo;
    
    return matchesSearch && matchesFilters;
  });

  const handleViewDetails = (cliente: any) => {
    setSelectedCliente(cliente);
    setIsDetailsOpen(true);
  };

  const handleEdit = (cliente: any) => {
    setSelectedCliente(cliente);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (cliente: any) => {
    setClienteToDelete(cliente);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    toast.success(`Cliente ${clienteToDelete?.nome} excluído com sucesso!`);
    setIsDeleteOpen(false);
    setClienteToDelete(null);
  };

  return (
    <>
      <Card className="card-elevated">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Nome</th>
                  <th className="text-left p-4 font-semibold text-gray-700">CNPJ/CPF</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Contatos</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Endereço</th>
                  <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{cliente.nome}</div>
                    </td>
                    <td className="p-4 text-sm font-mono">{cliente.cnpjCpf}</td>
                    <td className="p-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          {cliente.telefone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          {cliente.celular}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        {cliente.email}
                      </div>
                    </td>
                    <td className="p-4 text-sm max-w-xs truncate">{cliente.endereco}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(cliente)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(cliente)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-e2l-danger hover:text-e2l-danger"
                          onClick={() => handleDeleteClick(cliente)}
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

          {filteredClientes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum cliente encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      <ClienteDetailsModal
        cliente={selectedCliente}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Edit Modal */}
      <ClienteModal
        cliente={selectedCliente}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o cliente "{clienteToDelete?.nome}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-e2l-danger hover:bg-e2l-danger/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
