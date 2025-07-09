
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Phone } from "lucide-react";

interface FornecedoresTableProps {
  searchTerm: string;
}

const mockFornecedores = [
  {
    id: 1,
    nome: "Fornecedor XYZ Ltda",
    servico: "Equipamentos Industriais",
    telefone: "(11) 3333-2222",
    celular: "(11) 99999-1111",
    endereco: "Rua dos Fornecedores, 456 - São Paulo/SP"
  },
  {
    id: 2,
    nome: "Imobiliária GHI",
    servico: "Locação de Imóveis",
    telefone: "(11) 4444-5555",
    celular: "(11) 88888-6666",
    endereco: "Av. Comercial, 789 - São Paulo/SP"
  },
  {
    id: 3,
    nome: "Papelaria ABC",
    servico: "Material de Escritório",
    telefone: "(11) 2222-3333",
    celular: "(11) 77777-4444",
    endereco: "Rua do Comércio, 321 - São Paulo/SP"
  }
];

export function FornecedoresTable({ searchTerm }: FornecedoresTableProps) {
  const [fornecedores] = useState(mockFornecedores);

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="card-elevated">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Nome</th>
                <th className="text-left p-4 font-semibold text-gray-700">Serviço</th>
                <th className="text-left p-4 font-semibold text-gray-700">Contatos</th>
                <th className="text-left p-4 font-semibold text-gray-700">Endereço</th>
                <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredFornecedores.map((fornecedor) => (
                <tr key={fornecedor.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{fornecedor.nome}</div>
                  </td>
                  <td className="p-4 text-sm">{fornecedor.servico}</td>
                  <td className="p-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {fornecedor.telefone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {fornecedor.celular}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm max-w-xs truncate">{fornecedor.endereco}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-e2l-danger hover:text-e2l-danger">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFornecedores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum fornecedor encontrado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
