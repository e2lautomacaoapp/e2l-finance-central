
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";
import { ReceitasTable } from "@/components/receitas/ReceitasTable";
import { ReceitaModal } from "@/components/receitas/ReceitaModal";
import { ReceitaDetailsModal } from "@/components/receitas/ReceitaDetailsModal";
import { ReceitaFiltersModal } from "@/components/receitas/ReceitaFiltersModal";
import { toast } from "sonner";

const Receitas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedReceita, setSelectedReceita] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: undefined, // Changed from empty string to undefined
    formaPagamento: undefined, // Changed from empty string to undefined
    dataInicio: "",
    dataFim: ""
  });

  const handleViewDetails = (receita: any) => {
    setSelectedReceita(receita);
    setIsDetailsModalOpen(true);
  };

  const handleEditReceita = (receita: any) => {
    setSelectedReceita(receita);
    setIsModalOpen(true);
  };

  const handleExportReceitas = () => {
    // Implementar exportação CSV
    const headers = ["Data", "NF", "Item/Serviço", "Cliente", "Valor", "Status", "Pagamento"];
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "receitas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Receitas exportadas com sucesso!");
  };

  const handleApplyFilters = (newFilters: any) => {
    // Convert "all" values to undefined for proper filtering
    const processedFilters = {
      status: newFilters.status === "all" ? undefined : newFilters.status,
      formaPagamento: newFilters.formaPagamento === "all" ? undefined : newFilters.formaPagamento,
      dataInicio: newFilters.dataInicio || "",
      dataFim: newFilters.dataFim || ""
    };
    
    setFilters(processedFilters);
    setIsFiltersModalOpen(false);
    toast.success("Filtros aplicados!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-e2l-primary">Receitas</h1>
          <p className="text-gray-600">Gerencie todas as receitas da empresa</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Receita
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar receitas..."
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
                onClick={handleExportReceitas}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receitas Table */}
      <ReceitasTable 
        searchTerm={searchTerm}
        filters={filters}
        onViewDetails={handleViewDetails}
        onEditReceita={handleEditReceita}
      />

      {/* Modal para Nova/Editar Receita */}
      <ReceitaModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReceita(null);
        }}
        receita={selectedReceita}
      />

      {/* Modal para Ver Detalhes */}
      <ReceitaDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedReceita(null);
        }}
        receita={selectedReceita}
      />

      {/* Modal de Filtros */}
      <ReceitaFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default Receitas;
