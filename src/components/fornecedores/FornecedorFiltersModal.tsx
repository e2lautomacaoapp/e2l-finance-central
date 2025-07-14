
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FornecedorFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    servico: string;
  };
  onFiltersChange: (filters: { servico: string }) => void;
}

export function FornecedorFiltersModal({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange 
}: FornecedorFiltersModalProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      servico: ""
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            Filtros de Fornecedores
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="servico">Tipo de Serviço</Label>
            <Input
              id="servico"
              placeholder="Ex: Equipamentos, Material de Escritório..."
              value={localFilters.servico}
              onChange={(e) => setLocalFilters(prev => ({ 
                ...prev, 
                servico: e.target.value 
              }))}
              className="input-field"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClearFilters}
            >
              Limpar Filtros
            </Button>
            <Button 
              type="button" 
              onClick={handleApplyFilters}
              className="btn-primary"
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
