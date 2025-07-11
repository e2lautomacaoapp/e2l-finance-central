
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface ReceitaFormData {
  valor: string;
  data: string;
  notaFiscal: string;
  item: string;
  cliente: string;
  status: string;
  formaPagamento: string;
  observacoes: string;
  quantidadeParcelas: string;
  valorParcela: string;
}

export function useReceitaForm(receita?: any) {
  const [formData, setFormData] = useState<ReceitaFormData>({
    valor: receita?.valor || "",
    data: receita?.data || new Date().toISOString().split('T')[0],
    notaFiscal: receita?.notaFiscal || "",
    item: receita?.item || "",
    cliente: receita?.cliente || "",
    status: receita?.status || "pendente",
    formaPagamento: receita?.formaPagamento || "Pix", // Changed from empty string to default value
    observacoes: receita?.observacoes || "",
    quantidadeParcelas: receita?.quantidadeParcelas || "1",
    valorParcela: receita?.valorParcela || ""
  });

  // Calculate installment value automatically
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

  const handleChange = (field: keyof ReceitaFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormaPagamentoChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      formaPagamento: value,
      quantidadeParcelas: value === "Cartão de Crédito" ? "1" : "",
      valorParcela: value === "Cartão de Crédito" ? "" : ""
    }));
  };

  const validateForm = (): boolean => {
    if (formData.formaPagamento === "Cartão de Crédito") {
      if (!formData.quantidadeParcelas || !formData.valorParcela) {
        toast.error("Preencha a quantidade e valor das parcelas para cartão de crédito");
        return false;
      }
      
      const parcelas = parseInt(formData.quantidadeParcelas);
      if (parcelas < 1 || parcelas > 4) {
        toast.error("Quantidade de parcelas deve ser entre 1 e 4");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (onClose: () => void) => {
    if (!validateForm()) return;
    
    console.log('Salvando receita:', formData);
    toast.success(receita ? "Receita atualizada com sucesso!" : "Receita criada com sucesso!");
    onClose();
  };

  return {
    formData,
    handleChange,
    handleFormaPagamentoChange,
    handleSubmit
  };
}
