
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useReceitaForm } from "@/hooks/useReceitaForm";
import { ReceitaFormFields } from "./ReceitaFormFields";
import { ReceitaSelectFields } from "./ReceitaSelectFields";
import { ReceitaInstallmentFields } from "./ReceitaInstallmentFields";

interface ReceitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  receita?: any;
}

export function ReceitaModal({ isOpen, onClose, receita }: ReceitaModalProps) {
  const { formData, handleChange, handleFormaPagamentoChange, handleSubmit } = useReceitaForm(receita);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onClose);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            {receita ? "Editar Receita" : "Nova Receita"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <ReceitaFormFields formData={formData} onChange={handleChange} />
          
          <ReceitaSelectFields 
            formData={formData} 
            onChange={handleChange}
            onFormaPagamentoChange={handleFormaPagamentoChange}
          />

          <ReceitaInstallmentFields formData={formData} onChange={handleChange} />

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
