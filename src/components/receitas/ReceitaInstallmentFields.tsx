
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReceitaFormData } from "@/hooks/useReceitaForm";

interface ReceitaInstallmentFieldsProps {
  formData: ReceitaFormData;
  onChange: (field: keyof ReceitaFormData, value: string) => void;
}

export function ReceitaInstallmentFields({ formData, onChange }: ReceitaInstallmentFieldsProps) {
  if (formData.formaPagamento !== "Cartão de Crédito") {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="quantidadeParcelas">Quantidade de Parcelas *</Label>
        <Select 
          value={formData.quantidadeParcelas} 
          onValueChange={(value) => onChange('quantidadeParcelas', value)}
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
          onChange={(e) => onChange('valorParcela', e.target.value)}
          required
          className="input-field"
        />
      </div>
    </div>
  );
}
