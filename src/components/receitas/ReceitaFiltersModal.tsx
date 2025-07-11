
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReceitaFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  currentFilters: {
    status: string;
    formaPagamento: string;
    dataInicio: string;
    dataFim: string;
  };
}

export function ReceitaFiltersModal({ isOpen, onClose, onApplyFilters, currentFilters }: ReceitaFiltersModalProps) {
  const [filters, setFilters] = useState({
    status: currentFilters.status || undefined, // Use undefined instead of empty string
    formaPagamento: currentFilters.formaPagamento || undefined, // Use undefined instead of empty string
    dataInicio: currentFilters.dataInicio || "",
    dataFim: currentFilters.dataFim || ""
  });

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      status: undefined,
      formaPagamento: undefined,
      dataInicio: "",
      dataFim: ""
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            Filtrar Receitas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={filters.status || ""} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value || undefined }))}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Forma de Pagamento</Label>
            <Select value={filters.formaPagamento || ""} onValueChange={(value) => setFilters(prev => ({ ...prev, formaPagamento: value || undefined }))}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Todas as formas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Pix">Pix</SelectItem>
                <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={filters.dataInicio}
                onChange={(e) => setFilters(prev => ({ ...prev, dataInicio: e.target.value }))}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={filters.dataFim}
                onChange={(e) => setFilters(prev => ({ ...prev, dataFim: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClear}>
            Limpar
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" className="btn-primary" onClick={handleApply}>
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
