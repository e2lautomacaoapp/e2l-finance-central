
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const recentTransactions = [
  {
    id: 1,
    type: "receita",
    description: "Pagamento - Projeto Automação Industrial",
    client: "Empresa ABC Ltda",
    amount: 25000,
    date: "2024-01-08",
    status: "pago"
  },
  {
    id: 2,
    type: "despesa", 
    description: "Compra de Equipamentos",
    supplier: "Fornecedor XYZ",
    amount: 8500,
    date: "2024-01-07",
    status: "pago"
  },
  {
    id: 3,
    type: "receita",
    description: "Manutenção Preventiva",
    client: "Indústria DEF",
    amount: 12000,
    date: "2024-01-06",
    status: "pendente"
  },
  {
    id: 4,
    type: "despesa",
    description: "Aluguel do Escritório",
    supplier: "Imobiliária GHI",
    amount: 4500,
    date: "2024-01-05", 
    status: "pago"
  },
  {
    id: 5,
    type: "receita",
    description: "Consultoria Técnica",
    client: "Empresa JKL",
    amount: 8000,
    date: "2024-01-04",
    status: "pago"
  }
];

export function RecentTransactions() {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-e2l-primary">
          Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'receita' 
                    ? 'bg-e2l-success/10 text-e2l-success' 
                    : 'bg-e2l-danger/10 text-e2l-danger'
                }`}>
                  {transaction.type === 'receita' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {transaction.type === 'receita' ? transaction.client : transaction.supplier}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <span className={`font-semibold text-sm ${
                  transaction.type === 'receita' ? 'text-e2l-success' : 'text-e2l-danger'
                }`}>
                  {transaction.type === 'receita' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR')}
                </span>
                <Badge 
                  variant={transaction.status === 'pago' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {transaction.status === 'pago' ? 'Pago' : 'Pendente'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
