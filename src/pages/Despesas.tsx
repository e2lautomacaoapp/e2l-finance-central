
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";
import { DespesasTable } from "@/components/despesas/DespesasTable";
import { DespesaModal } from "@/components/despesas/DespesaModal";
import { DespesaDetailsModal } from "@/components/despesas/DespesaDetailsModal";
import { DespesaFiltersModal } from "@/components/despesas/DespesaFiltersModal";
import { toast } from "sonner";

const Despesas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedDespesa, setSelectedDespesa] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: undefined as string | undefined,
    formaPagamento: undefined as string | undefined,
    dataInicio: "",
    dataFim: "",
  });

  const handleViewDetails = (despesa: any) => {
    setSelectedDespesa(despesa);
    setIsDetailsModalOpen(true);
  };

  const handleEditDespesa = (despesa: any) => {
    setSelectedDespesa(despesa);
    setIsModalOpen(true);
  };

  const handleDeleteDespesa = (despesa: any) => {
    // Aqui você implementaria a lógica de exclusão
    console.log('Deletando despesa:', despesa);
    toast.success("Despesa excluída com sucesso!");
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setIsFiltersModalOpen(false);
    toast.success("Filtros aplicados com sucesso!");
  };

  const handleExportDespesas = () => {
    // Lógica simples de exportação para CSV
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Data,Nota Fiscal,Item/Serviço,Fornecedor,Valor,Status,Pagamento\n"
      + "07/01/2024,NF-101/2024,Compra de Equipamentos,Fornecedor XYZ,R$ 8.500,Pago,Cartão de Crédito\n"
      + "05/01/2024,NF-102/2024,Aluguel do Escritório,Imobiliária GHI,R$ 4.500,Pago,Pix\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "despesas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Despesas exportadas com sucesso!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-e2l-primary">Despesas</h1>
          <p className="text-gray-600">Gerencie todas as despesas da empresa</p>
        </div>
        
        <Button 
          onClick={() => {
            setSelectedDespesa(null);
            setIsModalOpen(true);
          }}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar despesas..."
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
                onClick={handleExportDespesas}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Despesas Table */}
      <DespesasTable 
        searchTerm={searchTerm}
        filters={filters}
        onViewDetails={handleViewDetails}
        onEditDespesa={handleEditDespesa}
        onDeleteDespesa={handleDeleteDespesa}
      />

      {/* Modals */}
      <DespesaModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDespesa(null);
        }}
        despesa={selectedDespesa}
      />

      <DespesaDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedDespesa(null);
        }}
        despesa={selectedDespesa}
      />

      <DespesaFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default Despesas;
