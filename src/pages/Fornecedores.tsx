
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";
import { FornecedoresTable } from "@/components/fornecedores/FornecedoresTable";
import { FornecedorModal } from "@/components/fornecedores/FornecedorModal";
import { FornecedorFiltersModal } from "@/components/fornecedores/FornecedorFiltersModal";
import { FornecedorDetailsModal } from "@/components/fornecedores/FornecedorDetailsModal";

const Fornecedores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFornecedor, setSelectedFornecedor] = useState<any>(null);
  const [filters, setFilters] = useState({
    servico: ""
  });

  const handleExport = () => {
    // Dados mockados dos fornecedores para exportação
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

    const csv = [
      ["Nome", "Serviço", "Telefone", "Celular", "Endereço"],
      ...mockFornecedores.map(f => [
        f.nome,
        f.servico,
        f.telefone,
        f.celular,
        f.endereco
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fornecedores.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEdit = (fornecedor: any) => {
    setSelectedFornecedor(fornecedor);
    setIsModalOpen(true);
  };

  const handleViewDetails = (fornecedor: any) => {
    setSelectedFornecedor(fornecedor);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFornecedor(null);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedFornecedor(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-e2l-primary">Fornecedores</h1>
          <p className="text-gray-600">Gerencie todos os fornecedores da empresa</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar fornecedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsFiltersModalOpen(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fornecedores Table */}
      <FornecedoresTable 
        searchTerm={searchTerm}
        filters={filters}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
      />

      {/* Modal */}
      <FornecedorModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fornecedor={selectedFornecedor}
      />

      {/* Filters Modal */}
      <FornecedorFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Details Modal */}
      <FornecedorDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        fornecedor={selectedFornecedor}
      />
    </div>
  );
};

export default Fornecedores;
