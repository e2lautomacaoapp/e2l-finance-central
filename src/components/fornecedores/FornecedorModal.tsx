
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FornecedorModalProps {
  isOpen: boolean;
  onClose: () => void;
  fornecedor?: any;
}

export function FornecedorModal({ isOpen, onClose, fornecedor }: FornecedorModalProps) {
  const [formData, setFormData] = useState({
    nome: fornecedor?.nome || "",
    servico: fornecedor?.servico || "",
    telefone: fornecedor?.telefone || "",
    celular: fornecedor?.celular || "",
    endereco: fornecedor?.endereco || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você integraria com Supabase
    console.log('Salvando fornecedor:', formData);
    
    toast.success(fornecedor ? "Fornecedor atualizado com sucesso!" : "Fornecedor criado com sucesso!");
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            {fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome/Razão Social *</Label>
            <Input
              id="nome"
              placeholder="Nome completo ou razão social"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servico">Serviço/Produto *</Label>
            <Input
              id="servico"
              placeholder="Tipo de serviço ou produto fornecido"
              value={formData.servico}
              onChange={(e) => handleChange('servico', e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(11) 9999-9999"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular *</Label>
              <Input
                id="celular"
                placeholder="(11) 99999-9999"
                value={formData.celular}
                onChange={(e) => handleChange('celular', e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Textarea
              id="endereco"
              placeholder="Endereço completo..."
              value={formData.endereco}
              onChange={(e) => handleChange('endereco', e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary">
              {fornecedor ? "Atualizar" : "Criar Fornecedor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
