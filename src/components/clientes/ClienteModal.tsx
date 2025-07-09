
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente?: any;
}

export function ClienteModal({ isOpen, onClose, cliente }: ClienteModalProps) {
  const [formData, setFormData] = useState({
    nome: cliente?.nome || "",
    cnpjCpf: cliente?.cnpjCpf || "",
    telefone: cliente?.telefone || "",
    celular: cliente?.celular || "",
    endereco: cliente?.endereco || "",
    email: cliente?.email || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você integraria com Supabase
    console.log('Salvando cliente:', formData);
    
    toast.success(cliente ? "Cliente atualizado com sucesso!" : "Cliente criado com sucesso!");
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-e2l-primary">
            {cliente ? "Editar Cliente" : "Novo Cliente"}
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
            <Label htmlFor="cnpjCpf">CNPJ/CPF *</Label>
            <Input
              id="cnpjCpf"
              placeholder="00.000.000/0000-00 ou 000.000.000-00"
              value={formData.cnpjCpf}
              onChange={(e) => handleChange('cnpjCpf', e.target.value)}
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
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="contato@empresa.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="input-field"
            />
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
              {cliente ? "Atualizar" : "Criar Cliente"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
