
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface DespesaModalProps {
  isOpen: boolean;
  onClose: () => void;
  despesa?: any;
}

export function DespesaModal({ isOpen, onClose, despesa }: DespesaModalProps) {
  const [formData, setFormData] = useState({
    valor: despesa?.valor || "",
    data: despesa?.data || new Date().toISOString().split('T')[0],
    notaFiscal: despesa?.notaFiscal || "",
    item: despesa?.item || "",
    fornecedor: despesa?.fornecedor || "",
    status: despesa?.status || "pendente",
    formaPagamento: despesa?.formaPagamento || "",
    observacoes: despesa?.observacoes || "",
    quantidadeParcelas: despesa?.quantidadeParcelas || 1,
    valorParcela: despesa?.valorParcela || ""
  });

  // Cálculo automático do valor da parcela
  useEffect(() => {
    if (formData.formaPagamento === "Cartão de Crédito" && formData.valor && formData.quantidadeParcelas) {
      const valorTotal = parseFloat(formData.valor);
      const parcelas = parseInt(formData.quantidadeParcelas.toString());
      if (!isNaN(valorTotal) && !isNaN(parcelas) && parcelas > 0) {
        const valorCalculado = (valorTotal / parcelas).toFixed(2);
        setFormData(prev => ({ ...prev, valorParcela: valorCalculado }));
      }
    }
  }, [formData.valor, formData.quantidadeParcelas, formData.formaPagamento]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação adicional para cartão de crédito
    if (formData.formaPagamento === "Cartão de Crédito") {
      if (!formData.quantidadeParcelas || formData.quantidadeParcelas < 1 || formData.quantidadeParcelas > 6) {
        toast.error("Quantidade de parcelas deve estar entre 1 e 6");
        return;
      }
      if (!formData.valorParcela) {
        toast.error("Valor da parcela é obrigatório para pagamento no cartão de crédito");
        return;
      }
    }
    
    // Aqui você integraria com Supabase
    console.log('Salvando despesa:', formData);
    
    toast.success(despesa ? "Despesa atualizada com sucesso!" : "Despesa criada com sucesso!");
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormaPagamentoChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      formaPagamento: value,
      // Reset parcelas quando não for cartão de crédito
      quantidadeParcelas: value === "Cartão de Crédito" ? prev.quantidadeParcelas : 1,
      valorParcela: value === "Cartão de Crédito" ? prev.valorParcela : ""
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            {despesa ? "Editar Despesa" : "Nova Despesa"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => handleChange('valor', e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data">Data *</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => handleChange('data', e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="notaFiscal">Nota Fiscal</Label>
              <Input
                id="notaFiscal"
                placeholder="NF-101/2024"
                value={formData.notaFiscal}
                onChange={(e) => handleChange('notaFiscal', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor *</Label>
              <Input
                id="fornecedor"
                placeholder="Nome do fornecedor"
                value={formData.fornecedor}
                onChange={(e) => handleChange('fornecedor', e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item">Item/Serviço *</Label>
            <Input
              id="item"
              placeholder="Descrição do item/serviço"
              value={formData.item}
              onChange={(e) => handleChange('item', e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="input-field">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>  
                  <SelectItem value="vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Forma de Pagamento</Label>
              <Select value={formData.formaPagamento} onValueChange={handleFormaPagamentoChange}>
                <SelectTrigger className="input-field">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pix">Pix</SelectItem>
                  <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                  <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Campos condicionais para Cartão de Crédito */}
          {formData.formaPagamento === "Cartão de Crédito" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantidadeParcelas">Quantidade de Parcelas *</Label>
                <Input
                  id="quantidadeParcelas"
                  type="number"
                  min="1"
                  max="6"
                  placeholder="1"
                  value={formData.quantidadeParcelas}
                  onChange={(e) => handleChange('quantidadeParcelas', parseInt(e.target.value) || 1)}
                  required
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorParcela">Valor da Parcela *</Label>
                <Input
                  id="valorParcela"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.valorParcela}
                  onChange={(e) => handleChange('valorParcela', e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações adicionais..."
              value={formData.observacoes}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary">
              {despesa ? "Atualizar" : "Criar Despesa"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
