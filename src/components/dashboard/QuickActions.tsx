
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Nova Receita",
      description: "Registrar nova entrada",
      icon: Plus,
      action: () => navigate("/receitas"),
      color: "bg-e2l-success hover:bg-e2l-success/90"
    },
    {
      title: "Nova Despesa", 
      description: "Registrar nova saída",
      icon: Plus,
      action: () => navigate("/despesas"),
      color: "bg-e2l-danger hover:bg-e2l-danger/90"
    },
    {
      title: "Gerar Relatório",
      description: "Exportar dados financeiros",
      icon: FileText,
      action: () => navigate("/relatorios"),
      color: "bg-e2l-secondary hover:bg-e2l-secondary/90"
    },
    {
      title: "Importar Dados",
      description: "Upload de planilhas",
      icon: Upload,
      action: () => {},
      color: "bg-e2l-accent hover:bg-e2l-accent/90"
    }
  ];

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-e2l-primary">
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white h-20 flex flex-col items-center justify-center gap-2 text-sm font-medium hover:scale-105 transition-all duration-200`}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-center leading-tight">
                {action.title}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
