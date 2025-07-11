
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReceitaFormData } from "@/hooks/useReceitaForm";

interface ReceitaSelectFieldsProps {
  formData: ReceitaFormData;
  onChange: (field: keyof ReceitaFormData, value: string) => void;
  onFormaPagamentoChange: (value: string) => void;
}

export function ReceitaSelectFields({ formData, onChange, onFormaPagamentoChange }: ReceitaSelectFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={formData.status} onValueChange={(value) => onChange('status', value)}>
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
        <Select value={formData.formaPagamento} onValueChange={onFormaPagamentoChange}>
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
  );
}
