
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReceitaFormData } from "@/hooks/useReceitaForm";

interface ReceitaFormFieldsProps {
  formData: ReceitaFormData;
  onChange: (field: keyof ReceitaFormData, value: string) => void;
}

export function ReceitaFormFields({ formData, onChange }: ReceitaFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="valor">Valor *</Label>
          <Input
            id="valor"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={formData.valor}
            onChange={(e) => onChange('valor', e.target.value)}
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
            onChange={(e) => onChange('data', e.target.value)}
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
            onChange={(e) => onChange('notaFiscal', e.target.value)}
            className="input-field"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente *</Label>
          <Input
            id="cliente"
            placeholder="Nome do cliente"
            value={formData.cliente}
            onChange={(e) => onChange('cliente', e.target.value)}
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
          onChange={(e) => onChange('item', e.target.value)}
          required
          className="input-field"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          placeholder="Observações adicionais..."
          value={formData.observacoes}
          onChange={(e) => onChange('observacoes', e.target.value)}
          className="input-field"
          rows={3}
        />
      </div>
    </>
  );
}
