
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ReceitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  receita?: any;
}

export function ReceitaModal({ isOpen, onClose, receita }: ReceitaModalProps) {
  const [formData, setFormData] = useState({
    valor: receita?.valor || "",
    data: receita?.data || new Date().toISOString().split('T')[0],
    notaFiscal: receita?.notaFiscal || "",
    item: receita?.item || "",
    cliente: receita?.cliente || "",
    status: receita?.status || "pendente",
    formaPagamento: receita?.formaPagamento || "",
    observacoes: receita?.observacoes || "",
    quantidadeParcelas: receita?.quantidadeParcelas || "1",
    valorParcela: receita?.valorParcela || ""
  });

  // Calcula automaticamente o valor da parcela quando valor total ou quantidade de parcelas mudam
  useEffect(() => {
    if (formData.formaPagamento === "Cartão de Crédito" && formData.valor && formData.quantidadeParcelas) {
      const valorTotal = parseFloat(formData.valor);
      const parcelas = parseInt(formData.quantidadeParcelas);
      if (!isNaN(valorTotal) && !isNaN(parcelas) && parcelas > 0) {
        const valorParcela = (valorTotal / parcelas).toFixed(2);
        setFormData(prev => ({ ...prev, valorParcela }));
      }
    }
  }, [formData.valor, formData.quantidadeParcelas, formData.formaPagamento]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação adicional para cartão de crédito
    if (formData.formaPagamento === "Cartão de Crédito") {
      if (!formData.quantidadeParcelas || !formData.valorParcela) {
        toast.error("Preencha a quantidade e valor das parcelas para cartão de crédito");
        return;
      }
      
      const parcelas = parseInt(formData.quantidadeParcelas);
      if (parcelas < 1 || parcelas > 4) {
        toast.error("Quantidade de parcelas deve ser entre 1 e 4");
        return;
      }
    }
    
    // Aqui você integraria com Supabase
    console.log('Salvando receita:', formData);
    
    toast.success(receita ? "Receita atualizada com sucesso!" : "Receita criada com sucesso!");
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormaPagamentoChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      formaPagamento: value,
      // Reset campos de parcelas se não for cartão de crédito
      quantidadeParcelas: value === "Cartão de Crédito" ? "1" : "",
      valorParcela: value === "Cartão de Crédito" ? "" : ""
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            {receita ? "Editar Receita" : "Nova Receita"}
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
                placeholder="NF-001/2024"
                value={formData.notaFiscal}
                onChange={(e) => handleChange('notaFiscal', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente *</Label>
              <Input
                id="cliente"
                placeholder="Nome do cliente"
                value={formData.cliente}
                onChange={(e) => handleChange('cliente', e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item">Item/Serviço *</Label>
            <Input
              id="item"
              placeholder="Descrição do serviço"
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
                <Select 
                  value={formData.quantidadeParcelas} 
                  onValueChange={(value) => handleChange('quantidadeParcelas', value)}
                >
                  <SelectTrigger className="input-field">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                    <SelectItem value="3">3x</SelectItem>
                    <SelectItem value="4">4x</SelectItem>
                  </SelectContent>
                </Select>
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
              {receita ? "Atualizar" : "Criar Receita"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
