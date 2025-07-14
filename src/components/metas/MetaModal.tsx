
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface MetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  meta?: any;
}

export function MetaModal({ isOpen, onClose, meta }: MetaModalProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    valor: "",
    periodo: "",
    tipo: "receita",
    descricao: ""
  });

  useEffect(() => {
    if (meta) {
      setFormData({
        titulo: meta.titulo || "",
        valor: meta.valorMeta?.toString() || "",
        periodo: meta.periodo || "",
        tipo: meta.tipo || "receita",
        descricao: meta.descricao || ""
      });
    } else {
      setFormData({
        titulo: "",
        valor: "",
        periodo: "",
        tipo: "receita",
        descricao: ""
      });
    }
  }, [meta]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você integraria com Supabase
    console.log('Salvando meta:', formData);
    
    toast.success(meta ? "Meta atualizada com sucesso!" : "Meta criada com sucesso!");
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
            {meta ? "Editar Meta" : "Nova Meta Financeira"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título da Meta *</Label>
            <Input
              id="titulo"
              placeholder="Ex: Receita Mensal Janeiro"
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor da Meta *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="150000.00"
                value={formData.valor}
                onChange={(e) => handleChange('valor', e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Meta</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleChange('tipo', value)}>
                <SelectTrigger className="input-field">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Controle de Despesa</SelectItem>
                  <SelectItem value="lucro">Lucro Líquido</SelectItem>
                  <SelectItem value="clientes">Novos Clientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodo">Período da Meta *</Label>
            <Input
              id="periodo"
              placeholder="Ex: Janeiro 2024, Q1 2024, 2024"
              value={formData.periodo}
              onChange={(e) => handleChange('periodo', e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descrição adicional da meta..."
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary">
              {meta ? "Atualizar" : "Criar Meta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
