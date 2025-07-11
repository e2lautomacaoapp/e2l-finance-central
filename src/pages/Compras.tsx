
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";
import { ComprasTable } from "@/components/compras/ComprasTable";
import { CompraModal } from "@/components/compras/CompraModal";
import { CompraFiltersModal } from "@/components/compras/CompraFiltersModal";
import { CompraDetailsModal } from "@/components/compras/CompraDetailsModal";

const Compras = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: undefined,
    dataInicio: "",
    dataFim: ""
  });

  const handleFiltersApply = (newFilters: any) => {
    setFilters(newFilters);
    setIsFiltersModalOpen(false);
  };

  const handleExport = () => {
    // Mock data for export
    const mockData = [
      { data: "08/01/2024", cliente: "Empresa ABC Ltda", itens: "Sensores industriais, Cabos elétricos", solicitante: "João Silva", valor: 15000, status: "aprovada" },
      { data: "06/01/2024", cliente: "Indústria DEF", itens: "CLP Siemens, Interface HMI", solicitante: "Maria Santos", valor: 28000, status: "pendente" },
      { data: "04/01/2024", cliente: "Metalúrgica XYZ", itens: "Inversores de frequência, Relés", solicitante: "Carlos Oliveira", valor: 12500, status: "entregue" }
    ];

    const csvContent = [
      ["Data", "Cliente", "Itens/Materiais", "Solicitante", "Valor", "Status"],
      ...mockData.map(item => [
        item.data,
        item.cliente,
        item.itens,
        item.solicitante,
        `R$ ${item.valor.toLocaleString('pt-BR')}`,
        item.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "compras.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetails = (compra: any) => {
    setSelectedCompra(compra);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (compra: any) => {
    setSelectedCompra(compra);
    setIsModalOpen(true);
  };

  const handleDelete = (compraId: number) => {
    console.log('Excluindo compra:', compraId);
    // Aqui você integraria com o backend para excluir
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-e2l-primary">Compras</h1>
          <p className="text-gray-600">Gerencie todas as compras da empresa</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Compra
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar compras..."
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

      {/* Compras Table */}
      <ComprasTable 
        searchTerm={searchTerm}
        filters={filters}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <CompraModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCompra(null);
        }}
        compra={selectedCompra}
      />

      <CompraFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleFiltersApply}
        currentFilters={filters}
      />

      <CompraDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedCompra(null);
        }}
        compra={selectedCompra}
      />
    </div>
  );
};

export default Compras;
